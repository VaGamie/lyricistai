from .models import *
from rest_framework import serializers


class Ytdataserializer(serializers.ModelSerializer):
    class Meta:
        model = Ytdata
        fields = '__all__'


