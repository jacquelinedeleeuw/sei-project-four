from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

from .serializers.common import YieldSerializer
from .models import Yield

class YieldListView(APIView):
    def post(self, request):
        yield_to_create = YieldSerializer(data=request.data)
        if yield_to_create.is_valid():
            yield_to_create.save()
            return Response(yield_to_create.data, status=status.HTTP_201_CREATED)
        return Response(yield_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class YieldDetailView(APIView):
    permission_classes = (IsAuthenticated,)
    def get_yield(self, pk):
        try:
            return Yield.objects.get(pk=pk)
        except Yield.DoesNotExist:
            raise NotFound(detail="Cannot find that yield calculation")

    def patch(self, request, pk):
        yield_to_edit = self.get_yield(pk=pk)
        updated_yield = YieldSerializer(yield_to_edit, data=request.data, partial=True)
        if updated_yield.is_valid():
            updated_yield.save()
            return Response(updated_yield.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_yield.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        