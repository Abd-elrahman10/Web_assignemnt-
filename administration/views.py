from django.shortcuts import render , redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
@login_required
def home(request):
        return render(request, 'administration/dashboard.html')
@login_required
def users (request) :
        return render(request, 'administration/users.html')
@login_required
def edit (request) :
        return render(request, 'administration/edit.html')
@login_required
def add (request) :
        return render(request, 'administration/add.html')

# Create your views here.
