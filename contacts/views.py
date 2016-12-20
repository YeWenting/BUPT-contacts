from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from contacts.models import Person

# Create your views here.

def getIndex(request):
    return render(request, 'index.html')

@login_required
def getContacts(request):
    personlist = Person.objects.all()
    num_of_males = Person.objects.filter(gender='male').__len__()
    num_of_females = Person.objects.filter(gender='female').__len__()
    num_of_contacts = num_of_females + num_of_males
    return render(request, 'contact.html', {'personlist': personlist, 'female': num_of_females, 'male': num_of_males,
                                            'tot':num_of_contacts})

def switchIndex(request):
    return HttpResponseRedirect("home/")

@login_required
def getAdd(request):
    if request.method == 'GET':
        return render(request, 'add.html')
    elif request.method == 'POST':
        name = request.POST['name']
        telephone = request.POST['telephone']
        mobile = request.POST['mobilephone']
        email = request.POST['email']
        address = request.POST['location']
        QQ = request.POST['OICQ']
        gender = request.POST['gender']
        person = Person(name=name, telephone=telephone, mobile=mobile, email=email, address=address, QQ=QQ, gender=gender)
        person.save()
        return HttpResponseRedirect("/contacts")


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


def delete(request):
    this_name = request.POST['name']
    p = Person.objects.filter(name=this_name)
    result = {}
    if p.__len__() > 0:
        result['message'] = 'success'
        p.delete()
    else:
        result['message'] = 'fail'
    return JsonResponse(result)


def edit(request):
    old_name = request.POST['old_name']
    new_name = request.POST['new_name']
    new_gender = request.POST['new_gender']
    new_telephone = request.POST['new_telephone']
    new_mobile = request.POST['new_mobile']
    new_address = request.POST['new_address']
    new_qq = request.POST['new_qq']
    new_email = request.POST['new_email']

    result = {}
    p = Person.objects.get(name=old_name)
    if p:
        p.name = new_name
        p.gender = new_gender
        p.telephone = new_telephone
        p.mobile = new_mobile
        p.address = new_address
        p.QQ = new_qq
        p.email = new_email
        p.save()
        result['message'] = 'success'
    else:
        result['message'] = 'fail'

    return JsonResponse(result)


def find(request):
    name = request.GET['search-name']

    p = Person.objects.filter(name=name)

    return render(request, 'find.html', {'personlist':p})
