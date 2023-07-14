from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('login', views.index),
    path('logout', views.index),
    path('profile', views.index),
    path('register', views.index),
    path('services', views.index),
    path('offer', views.index),
    path('hire', views.index),
]
