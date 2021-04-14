from notes.serializers.common import NoteSerializer
from ..serializers.common import SavedPropertySerializer

class PopulatedSavedPropertySerializer(SavedPropertySerializer):
    notes = NoteSerializer(many=True)