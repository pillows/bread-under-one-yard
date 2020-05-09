
import csv
from .api.models import Symptom, Diagnosis
file = open("symptom.csv", 'r')
reader = csv.reader(file)

for row in reader:
	symptom = Symptom(name=row[0])
	s.save()

	print(row)