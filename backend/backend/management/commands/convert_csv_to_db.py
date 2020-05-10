from django.core.management.base import BaseCommand, CommandError
from api.models import Symptoms, Diagnosis
import csv
class Command(BaseCommand):
	help = 'Initializes db with default values from csv'

	def handle(self, *args, **options):
		file = open("symptoms.csv", 'r')
		reader = csv.reader(file)

		for diagnoses in reader:
			symptom = Symptoms.objects.create(name=diagnoses[0])
			symptom.save()
			del diagnoses[0]
			for diagnosis in diagnoses:
				diag = Diagnosis.objects.create(name=diagnosis, symptom=symptom)
				diag.save()


        