from django.urls import path
from .views import NoteListView

urlpatterns = [
    path('', NoteListView.as_view())
]
