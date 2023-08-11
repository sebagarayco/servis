from django.urls import include, path
from rest_framework import routers
from knox import views as knox_views
from .api import RegisterAPI, LoginAPI, UserAPI, UserProfileView, CategoryView, SubcategoryView, ServiceView, LocationCreateView

router = routers.DefaultRouter()
router.register('categories', CategoryView, 'categories')
router.register('users', UserProfileView, 'users')
router.register('services', ServiceView, 'services')
router.register('create_location', LocationCreateView, 'create_location')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/user', UserAPI.as_view()),
    path('auth/login', LoginAPI.as_view()),
    path('auth/register', RegisterAPI.as_view()),
    path('auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
]
