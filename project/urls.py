
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('jwt_auth.urls')),
    path('api/notes/', include('notes.urls')),
    path('api/yield/', include('yield_calculations.urls')),
    path('api/savedproperties/', include('saved_properties.urls')),
    path('api/checkout/', include('products.urls'))
]
