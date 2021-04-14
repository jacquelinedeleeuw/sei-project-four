from django.db import models

class Note(models.Model):
    text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    saved_property = models.ForeignKey(
        "saved_properties.SavedProperty",
        related_name="notes",
        on_delete=models.CASCADE
    )
