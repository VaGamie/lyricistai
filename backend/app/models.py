from django.db import models

# Create your models here.
class Ytdata(models.Model):
    title = models.CharField(max_length=101)
    description = models.CharField(max_length=1200)
    date = models.DateField(auto_now=True)
    author = models.CharField(max_length=100)
    