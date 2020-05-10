from django.test import TestCase
from api.models import Symptoms, Diagnosis
# Create your tests here.


class SymptomsAndDiagnosisTestCase(TestCase):
    def setUp(self):
        symptom = Symptoms.objects.create(name="itchy rash")
        diagnosis = Diagnosis.objects.create(symptom=symptom, name="common cold")

    def test_symptom_exists(self):
        rash = Symptoms.objects.get(name="itchy rash")
        self.assertEqual(rash.name, "itchy rash")

    def test_symptom_exists_id(self):
        rash = Symptoms.objects.get(name="itchy rash")
        self.assertEqual(rash.id, 1)

    def test_symptom_list(self):
        response = self.client.get("/api/symptoms")
        self.assertEqual(response.status_code, 200)

    def test_individual_symptom(self):
        response = self.client.get("/api/symptoms/1")
        self.assertEqual(response.status_code, 200)

    def test_symptom_not_exist(self):
        response = self.client.get("/api/symptoms/5")
        self.assertEqual(response.status_code, 404)

    def test_diagnosis_list(self):
        response = self.client.get("/api/diagnosis/")
        self.assertEqual(response.status_code, 200)

