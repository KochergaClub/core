import logging
logger = logging.getLogger(__name__)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes

from .serializers import CustomerSerializer, OrderSerializer
from . import tools


class MeView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        if not hasattr(request.user, 'customer'):
            raise exceptions.NotFound()

        customer = request.user.customer
        return Response(CustomerSerializer(customer).data)


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


@api_view()
@permission_classes((AllowAny,))
def people_now_view(request):
    return Response(tools.now_stats_cached())
