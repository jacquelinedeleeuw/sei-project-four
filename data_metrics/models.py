from django.db import models

class DataMetrics(models.Model):
    average_rental = models.models.FloatField()
    
    
    def __str__(self):
        return f"{self.address}"
        