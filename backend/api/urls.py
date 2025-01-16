from django.urls import path
from .views import GreetView

urlpatterns = [
    path('greet/', GreetView.as_view(), name='greet'),
]