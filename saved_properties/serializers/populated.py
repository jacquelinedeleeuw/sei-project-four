from notes.serializers.common import NoteSerializer
from yield_calculations.serializers.common import YieldSerializer
from ..serializers.common import SavedPropertySerializer

class PopulatedSavedPropertySerializer(SavedPropertySerializer):
    notes = NoteSerializer(many=True)
    yield_calculations = YieldSerializer(many=True)