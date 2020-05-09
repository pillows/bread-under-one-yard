from rest_framework import viewsets
from . import models
from . import serializers

class SymptomsViewset(viewsets.ModelViewSet):
    queryset = models.Symptoms.objects.all()
    serializer_class = serializers.SymptomsSerializer

class DiagnosisViewset(viewsets.ModelViewSet):
    queryset = models.Diagnosis.objects.all()
    serializer_class = serializers.DiagnosisSerializer
