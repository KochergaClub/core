from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import exceptions

from .serializers import CustomerSerializer


class MeView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            raise exceptions.NotAuthenticated()
        if not hasattr(request.user, 'customer'):
            raise exceptions.NotFound()

        customer = request.user.customer
        return Response({
            'customer': CustomerSerializer(customer).data,
            'orders_count': customer.orders().count(),
        })


class SetPrivacyModeView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            raise exceptions.NotAuthenticated()
        if not hasattr(request.user, 'customer'):
            raise exceptions.NotFound()

        customer = request.user.customer

        customer.privacy_mode = request.POST['privacy_mode']
        customer.full_clean()
        customer.save()

        return Response('ok')
