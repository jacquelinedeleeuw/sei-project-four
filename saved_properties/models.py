from django.db import models

class SavedProperty(models.Model):
    address = models.CharField(max_length=50, blank=True)
    postcode = models.CharField(max_length=50, blank=True)
    short_description = models.CharField(max_length=99999, blank=True)
    property_type = models.CharField(max_length=50, blank=True)
    image = models.CharField(max_length=99999, blank=True)
    price = models.FloatField()
    beds = models.FloatField()
    baths = models.FloatField()
    receptions = models.FloatField()
    listing_id = models.CharField(max_length=50, blank=True)
    user = models.ForeignKey(
        "jwt_auth.User",
        related_name="saved_properties",
        on_delete=models.CASCADE
    )
    
    def __str__(self):
        return f"{self.address}"
        