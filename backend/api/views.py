from rest_framework import viewsets, generics, status
from .models import Diagnosis, Symptoms
from .serializers import DiagnosisSerializer, SymptomsSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

import logging

@api_view(['GET'])
def symptoms_list(request):
    if request.method=='GET':
        obj=Symptoms.objects.all()
        serializer=SymptomsSerializer(obj,many=True)
        return Response(status=status.HTTP_200_OK,data=serializer.data)

@api_view(['GET'])
def diagnosis_list(request):
    if request.method=='GET':
        obj=Diagnosis.objects.all()
        serializer=DiagnosisSerializer(obj,many=True)
        return Response(status=status.HTTP_200_OK,data=serializer.data)

@api_view(['GET'])
def diagnosis_list_by_symptom(request,pk):
    if request.method=='GET':
        if not pk:
            obj=Diagnosis.objects.all()
        else:
            obj=Diagnosis.objects.all().filter(symptom=pk)
        serializer=DiagnosisSerializer(obj,many=True)

        if not serializer.data:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK,data=serializer.data)

@api_view(['GET'])
def diagnosis_increment(request,pk):
    try:
        obj = Diagnosis.objects.all().filter(id=pk)
    except Diagnosis.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method=='GET':
        counter = obj.values("counter")[0]["counter"] + 1
        obj.update(counter=counter)
        serializer=DiagnosisSerializer(obj, many=True)
        return Response(status=status.HTTP_200_OK,data=serializer.data)
