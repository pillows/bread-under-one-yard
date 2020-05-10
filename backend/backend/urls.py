from django.contrib import admin
from rest_framework import routers
from api.views import symptoms_list, diagnosis_increment, diagnosis_list_by_symptom, diagnosis_list
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'api/symptoms/', symptoms_list),
    path(r'api/symptoms/<int:pk>', diagnosis_list_by_symptom),
    path(r'api/diagnosis/', diagnosis_list),
    path(r'api/diagnosis/<int:pk>/increment',diagnosis_increment)
]