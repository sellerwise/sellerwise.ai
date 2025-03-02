from django.shortcuts import render

# Create your views here.

def homepage(request):
    return render(request, "homepage.html")


def about(request):
    return render(request, "about_us.html")