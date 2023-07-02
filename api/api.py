from servis.models import Category, Subcategory, Profile, Service
from rest_framework import viewsets, generics, permissions, mixins
from rest_framework.response import Response
from knox.models import AuthToken
from django.contrib.auth.models import User
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, UserProfileSerializer, CategorySerializer, SubCategorySerializer, ServiceSerializer


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

    def get_object(self):
        return self.request.user

    def list(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class UserProfileView(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Profile.objects.all()


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
