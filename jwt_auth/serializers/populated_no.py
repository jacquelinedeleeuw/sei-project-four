from rest_framework import serializers
from saved_properties.serializers.common import SavedPropertySerializer
from notes.serializers.common import NoteSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class PopulatedNewUserSerializer(serializers.ModelSerializer):
    saved_properties = SavedPropertySerializer(many=True)




    class Meta:
            model = User
            fields = '__all__'