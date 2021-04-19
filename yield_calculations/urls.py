from django.urls import path
from .views import YieldListView

urlpatterns = [
    path('', YieldListView.as_view())
]