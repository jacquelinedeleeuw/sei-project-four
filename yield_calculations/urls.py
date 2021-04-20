from django.urls import path
from .views import YieldListView, YieldDetailView

urlpatterns = [
    path('', YieldListView.as_view()),
    path('<int:pk>/', YieldDetailView.as_view())
]