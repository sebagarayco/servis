from django.shortcuts import render, redirect
from users.models import ServisUser
from django.http import JsonResponse

def index(request):
    return render(request, 'frontend/index.html')


def profile(request, id):
    try:
        user = ServisUser.objects.get(pk=id)
        # Customize this response based on your user model
        response_data = {
            'username': user.username,
            'email': user.email,
            # Add other user information you want to return
        }
        # Pass the profile_id to the template context
        context = {
            'profile_id': id,
            'user_data': response_data,
        }
        return render(request, 'frontend/index.html', context)
    except ServisUser.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
