from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

from .models import SavedProperty
from .serializers.common import SavedPropertySerializer
from .serializers.populated import PopulatedSavedPropertySerializer

class SavedPropertyListView(APIView):
    def get(self, _request):
        saved_properties = SavedProperty.objects.all() # return everything from the db
        serialized_saved_properties = PopulatedSavedPropertySerializer(saved_properties, many=True) # convert the data
        return Response(serialized_saved_properties.data, status=status.HTTP_200_OK)

    def post(self, request):
        property_to_create = SavedPropertySerializer(data=request.data)
        if property_to_create.is_valid():
            property_to_create.save()
            return Response({'message': 'Property addition successful'}, status=status.HTTP_202_ACCEPTED)
        return Response(property_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        
        
class SavedPropertyDetailView(APIView):
    permission_classes = (IsAuthenticated,)
    def get_saved_property(self, pk):
        try:
            return SavedProperty.objects.get(pk=pk)
        except SavedProperty.DoesNotExist:
            raise NotFound(detail="Cannot find that property")

    def get(self, _request, pk):
        saved_property = self.get_saved_property(pk=pk)
        serialized_saved_property = PopulatedSavedPropertySerializer(saved_property)
        return Response(serialized_saved_property.data, status=status.HTTP_200_OK)

    def delete(self, _request, pk):
        saved_property_to_delete = self.get_saved_property(pk=pk)
        saved_property_to_delete.delete()
        return Response(f"Property {pk} deleted successfully", status=status.HTTP_200_OK)

    def patch(self, request, pk):
        saved_property_to_edit = self.get_saved_property(pk=pk)
        updated_saved_property = PopulatedSavedPropertySerializer(saved_property_to_edit, data=request.data, partial=True)
        if updated_saved_property.is_valid():
            updated_saved_property.save()
            return Response(updated_saved_property.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_saved_property.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)