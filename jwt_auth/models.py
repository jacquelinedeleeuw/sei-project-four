from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    password = models.CharField(max_length=128, verbose_name='password', blank=True)
    password_confirmation = models.CharField(max_length=128, verbose_name='password', blank=True)
    profile_image = models.CharField(max_length=300, blank=True, default='http://res.cloudinary.com/dyng677ts/image/upload/v1618691793/czguijbf0xi9iterh54p.png')
    pro = models.BooleanField(default=False)
