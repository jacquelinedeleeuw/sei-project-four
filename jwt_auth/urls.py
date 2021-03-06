from django.urls import path
from .views import UserView, UserDetailView, RegisterView, LoginView

urlpatterns = [
    path('', UserView.as_view()),
    path('<int:pk>/', UserDetailView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view())
]
