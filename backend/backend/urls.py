
# from django.contrib import admin
# from django.urls import include, path
# from djangorestframework.views import ListOrCreateModelView
# import symptoms
# import diagnosis

from django.contrib import admin
from rest_framework import routers
from api.views import symptoms_list, diagnosis_list, diagnosis_increment, diagnosis_list_by_symptom
from django.urls import include, path

# urlpatterns = [
#     path('admin/', admin.site.urls),

# router = routers.DefaultRouter()

# router.register(r'symptoms', api_views.symptoms_list)
# # router.register(r'diagnosis', api_views.diagnosis_list)
# # router.register(r'diagnosis/(?P<symptom>\d+)/?$', api_views.DiagnosisFilter.as_view(), basename="DiagnosisFilter")
# router.register(r'diagnosis/<int:pk>', api_views.diagnosis_filter)

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'api/symptoms/', symptoms_list),
    path(r'api/symptoms/<int:pk>', diagnosis_list_by_symptom),
    path(r'api/diagnosis/', diagnosis_list),
    path(r'api/diagnosis/<int:pk>/increment', view=diagnosis_increment, name='diagnosis_increment')

    # path(r'api/diagnosis/', view=diagnosis_list, name='diagnosis_list')

]