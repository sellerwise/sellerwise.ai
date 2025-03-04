from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.contrib import messages


# Create your views here.

def homepage(request):
    return render(request, "homepage.html")


def about(request):
    return render(request, "about_us.html")


@csrf_exempt
def contact_us(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        send_mail_to_support(name, email, subject, message)

    else:
        return render(request, "contact_us.html")

import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_mail_to_support(name, user_email, subject, message):
    # SMTP Configuration (Using Gmail Example)
    smtp_server = "smtp.gmail.com"  # Change if using Outlook/Yahoo
    port = 587
    sender_email = "sellerwise.ai@gmail.com"  # Your email
    sender_password = os.getenv("EMAIL_PASS")  # Securely store App Password
    receiver_email = "support@example.com"  # Support team's email

    # Create the email
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = f"Support Query from {name} - {subject}"

    email_content = f"""
    Name: {name}
    Email: {user_email}

    Message:
    {message}
    """

    msg.attach(MIMEText(email_content, "plain"))

    try:
        # Send the email
        with smtplib.SMTP(smtp_server, port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, msg.as_string())

        print("Email sent successfully!")
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False
