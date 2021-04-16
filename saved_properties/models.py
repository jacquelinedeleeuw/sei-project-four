from django.db import models

class SavedProperty(models.Model):
    address = models.CharField(max_length=50)
    postcode = models.CharField(max_length=50)
    short_description = models.CharField(max_length=99999)
    image = models.CharField(max_length=99999)
    listing_id = models.CharField(max_length=50)
    user = models.ForeignKey(
        "jwt_auth.User",
        related_name="saved_properties",
        on_delete=models.CASCADE
    )
    
    def __str__(self):
        return f"{self.address}"
        