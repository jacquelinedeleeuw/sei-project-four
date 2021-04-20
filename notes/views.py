from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

from .serializers.common import NoteSerializer
from .models import Note

class NoteListView(APIView):
    def post(self, request):
        note_to_create = NoteSerializer(data=request.data)
        if note_to_create.is_valid():
            note_to_create.save()
            return Response(note_to_create.data, status=status.HTTP_201_CREATED)
        return Response(note_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class NoteDetailView(APIView):
    permission_classes = (IsAuthenticated,)
    def get_note(self, pk):
        try:
            return Note.objects.get(pk=pk)
        except Note.DoesNotExist:
            raise NotFound(detail="Cannot find that note")

    def delete(self, _request, pk):
        note_to_delete = self.get_note(pk=pk)
        note_to_delete.delete()
        return Response(f"Note {pk} deleted successfully", status=status.HTTP_200_OK)
    