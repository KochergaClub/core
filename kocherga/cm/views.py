from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework.permissions import IsAuthenticated

from .serializers import CustomerSerializer, OrderSerializer


class MeView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        if not hasattr(request.user, 'customer'):
            raise exceptions.NotFound()

        customer = request.user.customer
        return Response({
            'customer': CustomerSerializer(customer).data,
            'orders_count': customer.orders().count(),
        })


class MyOrdersView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        if not hasattr(request.user, 'customer'):
            raise exceptions.NotFound()

        customer = request.user.customer

        orders = customer.orders().order_by('-order_id')[:10]
        return Response(
            OrderSerializer(orders, many=True).data
        )


class SetPrivacyModeView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        if not hasattr(request.user, 'customer'):
            raise exceptions.NotFound()

        customer = request.user.customer

        customer.privacy_mode = request.data['privacy_mode']
        customer.full_clean()
        customer.save()

        return Response('ok')
