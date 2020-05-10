from rest_framework import viewsets, generics
from .models import Diagnosis, Symptoms
from .serializers import DiagnosisSerializer, SymptomsSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def symptoms_list(request):
    if request.method=='GET':
        obj=Symptoms.objects.all()
        serializer=SymptomsSerializer(obj,many=True)
        return Response(serializer.data)

# @api_view(['GET'])
# def diagnosis_list(request, pk=None):
#     if request.method=='GET':

#         symptom = request.GET.get("symptom")
        
#         if not pk:
#             obj=Diagnosis.objects.all()
#         else:
#             obj=Diagnosis.objects.all().filter(symptom=pk)

#         serializer=DiagnosisSerializer(obj,many=True)
#         return Response(serializer.data)

@api_view(['GET','PUT'])
def diagnosis_filter(request,pk):
    try:
        obj=Diagnosis.objects.all().filter(symptom=pk)
    except Diagnosis.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method=='GET':
        serializer=DiagnosisSerializer(obj)
        return Response(serializer.data)
    elif request.method=='PUT':
        serializer=DiagnosisSerializer(obj,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def diagnosis_list_by_symptom(request,pk):
    if request.method=='GET':

        if not pk:
            obj=Diagnosis.objects.all()
        else:
            obj=Diagnosis.objects.all().filter(symptom=pk)

        serializer=DiagnosisSerializer(obj,many=True)
        
        return Response(serializer.data)

@api_view(['GET'])
def diagnosis_increment(request,pk):
    try:
        obj=Diagnosis.objects.all().filter(id=pk)
    except Diagnosis.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method=='GET':
        counter = obj['counter']
        return Response({"counter", counter})
        # serializer=DiagnosisSerializer(obj)
        # if serializer.is_valid():
        #     obj.update({"count": })