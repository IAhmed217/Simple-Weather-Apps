from django.shortcuts import render
from django.http import HttpResponse
import json
from dotenv import load_dotenv
from django.http import HttpResponseBadRequest
import os
import requests

load_dotenv()

# Create your views here.
def curr_weather_view(request):
    return render(request, 'currentweather/homepage.html')

def get_curr_weather(request):
    if request.method == 'POST':
        city = json.loads(request.body.decode('utf-8'))
        print(city)
        url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={os.getenv("OPEN_WEATHER")}&units=metric'

        try:
            response = requests.get(url)
            print(response.status_code)
            content = response.text
            return HttpResponse(content)   
        except:
            return HttpResponseBadRequest("Please enter a valid city.")