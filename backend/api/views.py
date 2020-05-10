from rest_framework import status
from .models import Diagnosis, Symptoms
from .serializers import DiagnosisSerializer, SymptomsSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def symptoms_list(request):
    if request.method=='GET':
        symptoms=Symptoms.objects.all()
        serializer=SymptomsSerializer(symptoms,many=True)
        return Response(status=status.HTTP_200_OK,data=serializer.data)

@api_view(['GET'])
def diagnosis_list(request):
    # Used to debug just to see all the populated Diagnosis objects
    if request.method=='GET':
        diagnosis=Diagnosis.objects.all()
        serializer=DiagnosisSerializer(diagnosis,many=True)
        return Response(status=status.HTTP_200_OK,data=serializer.data)

@api_view(['GET'])
def diagnosis_list_by_symptom(request,pk):
    if request.method=='GET':
        if not pk:
            diagnosis=Diagnosis.objects.all()
        else:
            diagnosis=Diagnosis.objects.all().filter(symptom=pk)
        serializer=DiagnosisSerializer(diagnosis,many=True)

        if not serializer.data:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK,data=serializer.data)

@api_view(['GET'])
def diagnosis_increment(request,pk):
    if request.method=='GET':
        try:
            diagnosis = Diagnosis.objects.all().filter(id=pk)
        except Diagnosis.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if request.method=='GET':
            counter = diagnosis.values("counter")[0]["counter"] + 1
            diagnosis.update(counter=counter)
            serializer=DiagnosisSerializer(diagnosis, many=True)
            return Response(status=status.HTTP_200_OK,data=serializer.data)
