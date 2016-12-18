from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from contacts.models import Person

# Create your views here.

def getIndex(request):
    return render(request, 'index.html')

@login_required
def getContacts(request):
    return render(request, 'contact.html')

def switchIndex(request):
    return HttpResponseRedirect("home/")

@login_required
def getAdd(request):
    return render(request, 'add.html')

def getCV(request):
    return render(request, 'cv.html')

def logIn(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    elif request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request,user)
                # 重定向到成功页面
            else:
                print("user is not active")
                # 重定向到失败页面，省略
        else:
            print("user is None")
            #重定向到失败页面，省略
        print(request.session.keys())
        #print request.session['_auth_user_id']
        return HttpResponseRedirect('/contacts/')

def logOut(request):
    logout(request)
    return HttpResponseRedirect("/")