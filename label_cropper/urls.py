from django.urls import path
from label_cropper import views

app_name = 'label_cropper'

urlpatterns = [
    path('cropping-label/', views.label_cropper, name='label_cropper'),
]

