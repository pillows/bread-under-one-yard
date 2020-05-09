
# from django.contrib import admin
# from django.urls import include, path
# from djangorestframework.views import ListOrCreateModelView
# import symptoms
# import diagnosis

from django.contrib import admin
from rest_framework import routers
from api import views as api_views
from django.urls import include, path

# urlpatterns = [
#     path('admin/', admin.site.urls),

router = routers.DefaultRouter()

router.register(r'symptoms', api_views.SymptomsViewset)
router.register(r'diagnosis', api_views.DiagnosisViewset)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]