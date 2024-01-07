from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response
import youtube_transcript_api
import openai 




class Dataview(generics.ListCreateAPIView):
    queryset = Ytdata.objects.all()
    serializer_class = Ytdataserializer
    
    def index(request):
        if request.method == 'POST':
            transcript = ''
            youtube_url = request.POST.get("enter")
            transcript_disabled = 'There was error with your request'

            #check if the video doesnt exist or doesnt work properly
            video_unavailable = "Error"

            #split the url given by the user
            youtube_id = youtube_url.split('=')[-1]