from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.common import YieldSerializer
from .models import Yield

class YieldListView(APIView):
    def post(self, request):
        yield_to_create = YieldSerializer(data=request.data)
        if yield_to_create.is_valid():
            yield_to_create.save()
            return Response(yield_to_create.data, status=status.HTTP_201_CREATED)
        return Response(yield_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)