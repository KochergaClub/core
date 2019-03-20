from django.urls import path

from . import views

app_name = 'cashier'
urlpatterns = [
    path('', views.index, name='index'),
    path('cheque/<int:id>/action/redeem', views.cheque_redeem, name='index'),
]
