
from django.contrib import admin
<<<<<<< HEAD
from django.urls import path, include, re_path 
=======
from django.urls import path, include, re_path
>>>>>>> 263524b82f794459fc5a15293634949c56de0db3
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('jwt_auth.urls')),
    path('api/notes/', include('notes.urls')),
    path('api/yield/', include('yield_calculations.urls')),
    path('api/savedproperties/', include('saved_properties.urls')),
    path('api/checkout/', include('products.urls')),
    re_path(r'^.*$', index)
]
