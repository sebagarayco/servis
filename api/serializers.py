from .utils import get_latitude_longitude
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework_gis.serializers import GeoFeatureModelSerializer, GeometrySerializerMethodField
from django.contrib.gis.geos import Point
from django.contrib.auth import authenticate
# Models
from servis.models import Category, Subcategory, Service, Contract, ContractComments
from users.models import ServisUser, Location


class RegisterSerializer(serializers.ModelSerializer):
    """ Register Serializer

    Args:
        serializers (_type_): User Registration serializer

    Returns:
        _type_: _description_
    """

    class Meta:
        model = ServisUser
        fields = ('id', 'username', 'email', 'location', 'phone',
                  'password', 'first_name', 'last_name', 'government_id')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # TODO: Handle comments
        print('RegisterSerializer: ', validated_data)
        user = ServisUser.objects.create_user(username=validated_data['username'],
                                              email=validated_data['email'],
                                              password=validated_data['password'],
                                              first_name=validated_data['first_name'],
                                              last_name=validated_data['last_name'],
                                              government_id=validated_data['government_id'],
                                              location=validated_data['location'])
        return user


class LoginSerializer(serializers.Serializer):
    """ Login Serializer

    Args:
        serializers (_type_): User Login serializer

    Raises:
        serializers.ValidationError: _description_

    Returns:
        _type_: _description_
    """
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect user and password')


class UserProfileSerializer(serializers.ModelSerializer):
    """ User Profile Serializer

    Args:
        serializers (): User Profile serializer

    Returns:
        _type_: _description_
    """
    services = SerializerMethodField()

    class Meta:
        model = ServisUser
        fields = ('id', 'username', 'email', 'first_name', 'last_name',
                  'location', 'image', 'role', 'date_joined', 'last_login',
                  'is_active', 'is_staff', 'is_superuser', 'government_id', 'services')

    def get_services(self, obj):
        services = Service.objects.filter(provider=obj)
        return ServiceSerializer(services, many=True).data


class LocationSerializer(GeoFeatureModelSerializer):

    class Meta:
        model = Location
        geo_field = 'coordinates'
        fields = ('id', 'address', 'coordinates', 'created', 'updated',
                  'city', 'province', 'country', 'zip_code')


class UserSerializer(serializers.ModelSerializer):
    """ User Serializer

    Args:
        serializers (_type_): User Authentication serializer

    Returns:
        _type_: _description_
    """
    location = serializers.SerializerMethodField()

    class Meta:
        model = ServisUser
        fields = ('id', 'username', 'email', 'location', 'phone',
                  'first_name', 'last_name', 'government_id', 'image', 'role')

    def get_location(self, obj):
        location = Location.objects.get(id=obj.location.id)
        return LocationSerializer(location).data


class SubCategorySerializer(ModelSerializer):
    """ Subcategory Serializer

    Args:
        ModelSerializer (_type_): Subcategory serializer
    """
    category = serializers.CharField(source='category.name')

    class Meta:
        model = Subcategory
        fields = ('name', 'description', 'category')


class CategorySerializer(ModelSerializer):
    """ Category Serializer

    Args:
        ModelSerializer (_type_): Category serializer
    """
    subcategories = SubCategorySerializer(
        source='subcategory', many=True, read_only=True)

    class Meta:
        model = Category
        fields = ('name', 'description', 'subcategories')
        read_only_fields = ('subcategories',)


class ServiceSerializer(ModelSerializer):
    """ Service Serializer

    Args:
        ModelSerializer (_type_): Service serializer
    """
    subcategory = SubCategorySerializer(read_only=True)
    image = serializers.ImageField(required=False)
    user = SerializerMethodField()

    class Meta:
        model = Service
        fields = ('id', 'description', 'provider', 'user', 'subcategory',
                  'hourly_price', 'full_day_price', 'created', 'updated', 'image')

    def get_user(self, obj):
        user = ServisUser.objects.get(id=obj.provider.id)
        return UserSerializer(user).data


class ContractCommentsSerializer(ModelSerializer):
    """Contract Comments Serializer

    Args:
        ModelSerializer (_type_): Contract Comments Serializer
    """
    # user = UserSerializer(read_only=True)

    class Meta:
        model = ContractComments
        fields = ('id', 'comment', 'created', 'user')

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['user'] = UserSerializer(instance.user).data
        return ret

class ContractSerializer(ModelSerializer):
    """Contract Serializer

    Args:
        ModelSerializer (_type_): Contract Serializer
    """
    status = serializers.CharField(source='status.name', required=False)
    contract_comments = ContractCommentsSerializer(many=True, required=False)

    class Meta:
        model = Contract
        fields = ('id', 'status', 'is_active', 'description', 'consumer', 'provider',
                  'amount', 'service', 'contract_comments', 'created', 'updated')

    # See obj on GET request and create, update with ID
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['service'] = ServiceSerializer(instance.service).data
        ret['consumer'] = UserSerializer(instance.consumer).data
        ret['provider'] = UserSerializer(instance.provider).data
        return ret

    def update(self, instance, validated_data):
        contract_comments_data = validated_data.pop('contract_comments', [])

        # Update Contract fields if provided
        instance.status = validated_data.get('status', instance.status)
        instance.is_active = validated_data.get(
            'is_active', instance.is_active)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.consumer = validated_data.get('consumer', instance.consumer)
        instance.provider = validated_data.get('provider', instance.provider)
        instance.amount = validated_data.get('amount', instance.amount)
        instance.service = validated_data.get('service', instance.service)

        # Save updated Contract
        instance.save()

        # Create new ContractComments for the updated Contract
        for comment_data in contract_comments_data:
            ContractComments.objects.create(**comment_data, contract=instance)

        return instance
