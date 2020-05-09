from django.db import models

# Create your models here.


class Symptoms(models.Model):
	name = models.CharField(max_length=255)

	def __str__(self):
		return self.name

class Diagnosis(models.Model):
	name = models.CharField(max_length=255)
	symptom = models.ForeignKey(Symptoms, on_delete=models.CASCADE,)
	counter = models.IntegerField(default=0)

	def __str__(self):
		return self.name