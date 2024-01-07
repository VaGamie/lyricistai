from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response
import youtube_transcript_api
import openai 
from django.http import HttpResponse
import requests
import json
from youtube_transcript_api import YouTubeTranscriptApi



class Dataview(generics.ListCreateAPIView):
    queryset = Ytdata.objects.all()
    serializer_class = Ytdataserializer
    
    # def index(request):
    #     if request.method == 'POST':
    #         transcript = ''
    #         youtube_url = request.POST.get("enter")
    #         transcript_disabled = 'There was error with your request'

    #         #check if the video doesnt exist or doesnt work properly
    #         video_unavailable = "Error"

    #         #split the url given by the user
    #         youtube_id = youtube_url.split('=')[-1]


youtube_api_key = 'AIzaSyD6aESl44eGtzEKlWrkrx4d_fxaBVByI7o'

def index(request, name):
    url = request.GET.get('url', '')
    if request.method == 'Post':
        return HttpResponse(f"Hello, world. Your request is {name}")



def demo(request):
    r = requests.get('http://127.0.0.1:8000/')
    data = r.json()
    title = data[0]['title']
    author = data[0]['author']
    date = data[0]['date']
    summary = data[0]['summarized']

    if request.method == 'GET':
        url = request.GET.get('url', '')
        # use youtube api to get the transcript
        transcript = youtube_transcript_api.YouTubeTranscriptApi.get_transcript(url)
        return HttpResponse(transcript.title)

    return HttpResponse(data[0]["title"])

    


# def main(url):


    