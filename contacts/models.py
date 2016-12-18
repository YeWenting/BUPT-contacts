from django.db import models

# Create your models here.


class Person(models.Model):

    name = models.CharField(max_length=20)
    telephone = models.CharField(max_length=15)
    mobile = models.CharField(max_length=11)
    email = models.CharField(max_length=30)
    address = models.CharField(max_length=40)
    QQ = models.CharField(max_length=12)
    gender = models.BooleanField
