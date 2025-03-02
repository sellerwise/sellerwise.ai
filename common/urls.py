from django.urls import path
from common import views

app_name = 'common'

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('about-us/', views.about, name='homepage'),
]

