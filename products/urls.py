from django.urls import path
from .views import CreateCheckoutSessionView

urlpatterns = [
    path('', CreateCheckoutSessionView.as_view())
]
