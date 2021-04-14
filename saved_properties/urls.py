from django.urls import path
from .views import SavedPropertyListView

urlpatterns = [
    path('', SavedPropertyListView.as_view())
]
