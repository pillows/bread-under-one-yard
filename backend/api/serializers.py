from rest_framework import serializers
from . import models

class SymptomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Symptoms
        fields = ('id', 'name')

class DiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Diagnosis
        fields = ('id', 'name', 'symptom', 'counter')