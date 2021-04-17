from django.db import models

class SavedProperty(models.Model):
    address = models.CharField(max_length=50)
    postcode = models.CharField(max_length=50)
    short_description = models.CharField(max_length=99999)
<<<<<<< HEAD
    image = models.CharField(max_length=99999)
=======
    property_type = models.CharField(max_length=50)
    image = models.CharField(max_length=99999)
    price = models.FloatField()
    beds = models.FloatField()
    baths = models.FloatField()
    receptions = models.FloatField()
>>>>>>> 5c01a4ca241423551055d9529a2a61b9203d7757
    listing_id = models.CharField(max_length=50)
    user = models.ForeignKey(
        "jwt_auth.User",
        related_name="saved_properties",
        on_delete=models.CASCADE
    )
    
    def __str__(self):
        return f"{self.address}"
        