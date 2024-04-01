from .utils import get_latitude_longitude, get_coordinate_details
from django.contrib.gis.geos import Point
from rest_framework import viewsets, generics, permissions, mixins
from rest_framework.response import Response
from rest_framework import status
from knox.models import AuthToken
# Models
from users.models import ServisUser
from servis.models import Category, Subcategory, Service, Contract, ContractComments
# Serializers
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, CategorySerializer, SubCategorySerializer, ServiceSerializer, UserProfileSerializer, LocationSerializer, ContractSerializer, ContractCommentsSerializer


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })


class UserAPI(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def list(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class LocationCreateView(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    queryset = ''
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        address = request.data['address']
        city = request.data['city']
        province = request.data['province']
        zip_code = request.data['zip_code']
        country = request.data['country']

        latitude, longitude = get_latitude_longitude(address, city, province, zip_code, country)
        address = get_coordinate_details(latitude, longitude)
        if latitude is not None and longitude is not None:
            # TODO: Handle comments
            print('LocationCreateView - Location API: ', latitude, longitude, address)
            serializer.save(address=request.data['address'], # house_road might be empty - use form address
                            city=address.get("city"),
                            country=address.get("country"),
                            province=address.get("state"),
                            zip_code=address.get("zip_code"),
                            coordinates=f'POINT({latitude} {longitude})')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Failed to get latitude and longitude."}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = ServisUser.objects.all()


class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Category.objects.all()


class SubcategoryView(viewsets.ModelViewSet):
    serializer_class = SubCategorySerializer
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Subcategory.objects.all()


class ServiceView(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()
    
    def create(self, request, *args, **kwargs):
        # TODO: Handle comments
        print('ServiceView create: ', request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        subcategory = Subcategory.objects.get(category__name=request.data['category'],name=request.data['subcategory'])
        serializer.save(subcategory=subcategory)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ContractCommentView(viewsets.ModelViewSet):
    serializer_class = ContractCommentsSerializer
    queryset = ContractComments.objects.all()

class ContractView(viewsets.ModelViewSet):
    serializer_class = ContractSerializer
    queryset = Contract.objects.all()