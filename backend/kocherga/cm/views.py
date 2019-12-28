import logging
logger = logging.getLogger(__name__)

import time

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


stats_cached_ts = None
stats_cached = None
CACHE_PERIOD = 5


@api_view()
@permission_classes((AllowAny,))
def people_now_view(request):
    global stats_cached
    global stats_cached_ts

    now_ts = time.time()
    if stats_cached_ts and now_ts - stats_cached_ts < CACHE_PERIOD:
        logger.debug("return now stats from cache")
        return Response(stats_cached)

    stats = tools.now_stats()

    result = {
        "total": stats["total"],
        "customers": [
            {
                "first_name": c.first_name,
                "last_name": c.last_name,
                "card_id": c.card_id,
            }
            for c in stats["customers"]
            if c.privacy_mode == "public"
        ]
    }

    stats_cached = result
    stats_cached_ts = now_ts
    logger.debug("updated now stats")

    return Response(result)
