import ccard
import random
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from multiselectfield import MultiSelectField
from creditcards.models import CardNumberField, CardExpiryField, SecurityCodeField
from .managers import CustomUserManager

class Location(models.Model):
    """
    A model which holds information about a particular location
    """
    address = models.CharField(max_length=255, default=None, null=True, blank=True)
    city = models.CharField(max_length=100, default=None, null=True, blank=True)
    province = models.CharField(max_length=100, default=None, null=True, blank=True)
    country = models.CharField(max_length=100, default=None, null=True, blank=True)
    zip_code = models.CharField(max_length=5, default=None, null=True, blank=True)
    coordinates = models.PointField(geography=True, null=True, blank=True)

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True) 
    
class ServisUser(AbstractBaseUser, PermissionsMixin):
    roles = [ ('Provider', 'Provider'), ('Consumer', 'Consumer'), ]
    
    username = models.CharField(max_length=35, unique=True, default=None)
    email = models.EmailField(_("email address"), unique=True, default=None)
    first_name = models.CharField(max_length=35, default=None)
    last_name = models.CharField(max_length=35, default=None)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    government_id = models.CharField(max_length=8, unique=True, default=None)
    role = MultiSelectField(choices=roles, default='Consumer',
                            max_choices=2, max_length=15)
    image = models.ImageField(
        default='images/default.jpg', upload_to='images')
    location = models.ForeignKey(Location, on_delete=models.RESTRICT, related_name='user_location', default=None, null=True, blank=True)
    phone = models.CharField(max_length=15, default=None, null=True, blank=True)
    cc_number = CardNumberField(default=None, blank=True, null=True)
    cc_expiry = CardExpiryField(default=None, blank=True, null=True)
    cc_code = SecurityCodeField(default=None, blank=True, null=True)
    bank_account = models.CharField(default=None, blank=True, null=True, max_length=22)
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'government_id']
    
    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
@receiver(post_save, sender=ServisUser)
def populate_user(sender, instance, created, **kwargs):
    """ Populate user with random data if not provided.
    
    This is used for testing purposes.

    Args:
        sender (_type_): _description_
        instance (_type_): _description_
        created (_type_): _description_
    """
    if created:
        #if not instance.location:
        #    instance.location = Point(random.uniform(-71, -71.5), random.uniform(-41, -42.5))
        if not instance.phone:
            instance.phone = "+54-11-%s" % (random.randint(1, 9999999))
        if not instance.cc_number:
            instance.cc_number = ccard.visa()    
        if not instance.cc_expiry:
            instance.cc_expiry = "%s/%s" % (random.randint(1, 12), random.randint(24, 30))    
        if not instance.cc_code:
            instance.cc_code = random.randint(100, 999)    
        if not instance.bank_account:
            instance.bank_account = random.randint(1, 9999999999999999999999)    
        
        instance.save()