from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

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
        