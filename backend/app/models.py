from django.db import models

# Create your models here.
class Ytdata(models.Model):
    url = models.URLField(max_length=200, default='')
    title = models.CharField(max_length=101)
    author = models.CharField(max_length=100)
    summarized = models.CharField(max_length=1200)
    date = models.DateField(auto_now=True)

    
