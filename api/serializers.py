from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework_gis.serializers import GeoFeatureModelSerializer, GeometrySerializerMethodField

from django.contrib.auth import authenticate
from servis.models import Category, Subcategory, Service
from users.models import ServisUser


class RegisterSerializer(serializers.ModelSerializer):
    """ Register Serializer

    Args:
        serializers (_type_): User Registration serializer

    Returns:
        _type_: _description_
    """
    class Meta:
        model = ServisUser
        fields = ('id', 'username', 'email',
                  'password', 'first_name', 'last_name', 'government_id')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        print('Register serializer: ', validated_data)
        user = ServisUser.objects.create_user(username=validated_data['username'],
                                        email=validated_data['email'],
                                        password=validated_data['password'],
                                        first_name=validated_data['first_name'],
                                        last_name=validated_data['last_name'],
                                        government_id=validated_data['government_id'])
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
    

class UserSerializer(serializers.ModelSerializer):
    """ User Serializer

    Args:
        serializers (_type_): User Authentication serializer

    Returns:
        _type_: _description_
    """

    class Meta:
        model = ServisUser
        fields = ('id', 'username', 'email', 'location', 
                'first_name', 'last_name', 'government_id') 


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
    
    class Meta:
        model = Service
        fields = ('id', 'description', 'provider', 'subcategory',
                'hourly_price', 'full_day_price', 'created', 'updated')