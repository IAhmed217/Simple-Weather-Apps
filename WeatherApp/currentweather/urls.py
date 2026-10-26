from django.urls import path
from . import views

urlpatterns = [
    path('', views.curr_weather_view, name='weather_view'),
    path('curr-weather', views.get_curr_weather, name='get_curr_weather'),
]
