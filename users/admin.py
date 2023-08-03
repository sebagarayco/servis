from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import ServisUserChangeForm, ServisUserCreationForm
from .models import ServisUser


class ServisUserAdmin(UserAdmin):
    add_form = ServisUserCreationForm
    form = ServisUserChangeForm
    model = ServisUser
    list_display = ("email", "username", "is_staff", "is_active")
    list_filter = ("email", "username", "is_staff", "is_active")
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


admin.site.register(ServisUser, ServisUserAdmin)