from rest_framework import serializers
from ..models import SavedProperty

class SavedPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedProperty
        fields = '__all__'