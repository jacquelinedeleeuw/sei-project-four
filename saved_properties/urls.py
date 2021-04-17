from django.urls import path
from .views import SavedPropertyListView, SavedPropertyDetailView

urlpatterns = [
    path('', SavedPropertyListView.as_view()),
    path('<int:pk>/', SavedPropertyDetailView.as_view())
]
