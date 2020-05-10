from rest_framework import viewsets, generics
from .models import Diagnosis, Symptoms
from .serializers import DiagnosisSerializer, SymptomsSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view




# class SymptomsViewset(viewsets.ModelViewSet):
#     # logger.info("Whatever to log")
#     queryset = Symptoms.objects.all()
#     serializer_class = SymptomsSerializer

# class DiagnosisViewset(viewsets.ModelViewSet):
#     queryset = Diagnosis.objects.all()
#     serializer_class = DiagnosisSerializer

#     def retrieve(self, request, pk=None):
#         symptom = request.id
#         queryset = Diagnosis.objects.filter(symptom=symptom, pk=pk)

#         if not queryset:
#             return Response(status=status.HTTP_400_BAD_REQUEST)
#         else:
#             serializer = DiagnosisSerializer(queryset)
#             return Response(serializer.data,status=status.HTTP_200_OK)

# class DiagnosisFilter(generics.ListAPIView):
#     serializer_class = SymptomsSerializer
#     queryset = Symptoms.objects.all()

#     def get_queryset(self):
#         """
#         Optionally restricts the returned purchases to a given user,
#         by filtering against a `username` query parameter in the URL.
#         """
#         queryset = Diagnosis.objects.all()
#         symptom = self.request.query_params.get('symptom', None)
        
#         if symptom is not None:
#             queryset = queryset.filter(symptom=symptom)

#         return queryset

# class DiagnosisList(generics.ListAPIView):
#     serializer_class = DiagnosisSerializer

#     def get_queryset(self):
#         """
#         This view should return a list of all the purchases for
#         the user as determined by the username portion of the URL.
#         """
#         queryset = Diagnosis.objects.all()
#         username = self.request.query_params.get('symptom', None)
#         if username is not None:
#             queryset = queryset.filter(purchaser__username=username)
#         return queryset

@api_view(['GET'])
def symptoms_list(request):
    if request.method=='GET':
        obj=Symptoms.objects.all()
        serializer=SymptomsSerializer(obj,many=True)
        return Response(serializer.data)

@api_view(['GET'])
def diagnosis_list(request):
    if request.method=='GET':

        symptom = request.GET.get("symptom")

        obj=Diagnosis.objects.all().filter(symptom=symptom)
        serializer=DiagnosisSerializer(obj,many=True)
        return Response(serializer.data)

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

