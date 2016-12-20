#coding=utf-8
from django.conf.urls import url
from django.http import HttpResponseRedirect

from . import views

urlpatterns = [
    url(r'^$', views.switchIndex),
    url(r'^home/$', views.getIndex, name="home"),
    url(r'^contacts/$', views.getContacts, name="contacts"),
    url(r'^cv/$', views.getCV),
    url(r'^contacts/add/$', views.getAdd),
    url(r'^login/$', views.logIn),
    url(r'^logout/$', views.logOut),
    url(r'^contacts/delete/$', views.delete),
    url(r'^contacts/edit/$', views.edit),
    url(r'^contacts/find/$', views.find)

]