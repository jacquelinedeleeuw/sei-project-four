from saved_properties.serializers.common import SavedPropertySerializer
from notes.serializers.common import NoteSerializer
from ..serializers.common import UserSerializer

class PopulatedUserSerializer(UserSerializer):
    saved_properties = SavedPropertySerializer(many=True)