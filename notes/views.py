from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.common import NoteSerializer
from .models import Note

class NoteListView(APIView):
    def post(self, request):
        note_to_create = NoteSerializer(data=request.data)
        if note_to_create.is_valid():
            note_to_create.save()
            return Response(note_to_create.data, status=status.HTTP_201_CREATED)
        return Response(note_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    