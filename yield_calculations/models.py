from django.db import models

class Yield(models.Model):
    purchasePrice = models.FloatField()
    deposit = models.FloatField()
    loanTerms = models.FloatField()
    refurb = models.FloatField()
    purchaseCosts = models.FloatField()
    monthlyRent = models.FloatField()
    annualMaintenance = models.FloatField()
    managementFee = models.FloatField()
    mortgageInterest = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    saved_property = models.ForeignKey(
        "saved_properties.SavedProperty",
        related_name="yield_calculations",
        on_delete=models.CASCADE
    )
