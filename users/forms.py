from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import ServisUser

class ServisUserCreationForm(UserCreationForm):

    class Meta:
        model = ServisUser
        fields = ("email",)

class ServisUserChangeForm(UserChangeForm):

    class Meta:
        model = ServisUser
        fields = ("email",)