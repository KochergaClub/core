from django.urls import path
from . import views

urlpatterns = [
    path('templater/<name>/html', views.r_html),
    path('templater/<name>/png', views.r_png),
    path('templater/<name>/schema', views.r_schema),  # deprecacted
    path('templater/<name>/meta', views.r_meta),  # deprecated
    path('templater/<name>', views.r_meta),
    path('templater', views.r_list),
]