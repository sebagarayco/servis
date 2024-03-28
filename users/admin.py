from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.gis.db import models
from django.forms.widgets import TextInput
from .forms import ServisUserChangeForm, ServisUserCreationForm
from .models import ServisUser, Location


class ServisUserAdmin(UserAdmin):
    add_form = ServisUserCreationForm
    form = ServisUserChangeForm
    model = ServisUser
    list_display = ("email", "username", "is_staff", "is_active", "location")
    list_filter = ("email", "username", "is_staff", "is_active", "location")
    fieldsets = (
        (None, {"fields": ("username","email", "password", "image")}),
        ("Servis", {"fields": ("location", "role","first_name", "last_name" )}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "username","email","government_id", "first_name", "last_name", "location", "password1", "password2", "is_staff",
                "is_active", "groups", "user_permissions"
            )}
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)

class LocationAdmin(admin.ModelAdmin):
    model = Location
    list_display = ('address', 'city', 'province', 'country', 'zip_code', 'coordinates')
    readonly_fields = ('coordinates',)
    formfield_overrides = {
        models.PointField: {'widget': TextInput }
    }

admin.site.register(ServisUser, ServisUserAdmin)
admin.site.register(Location, LocationAdmin)