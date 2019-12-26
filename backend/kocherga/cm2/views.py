from rest_framework import viewsets, mixins, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models, serializers

from kocherga.django.pagination import CommonPagination
from kocherga.django.drf import BulkRetrieveMixin


class OrderViewSet(viewsets.ReadOnlyModelViewSet, mixins.CreateModelMixin):
    serializer_class = serializers.OrderSerializer
    permission_classes = [permissions.IsAdminUser]
    pagination_class = CommonPagination
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['id']

    def get_queryset(self):
        qs = models.Order.objects.all()
        status = self.request.query_params.get('status')
        if status:
            qs = qs.filter_by_status(status)
        customer_id = self.request.query_params.get('customer_id')
        if customer_id:
            qs = qs.filter_by_customer_id(customer_id)
        return qs

    @action(detail=True, methods=['POST'])
    def close(self, request, pk=None):
        order = self.get_object()
        order.close()

        return Response('ok')


class CustomerViewSet(
        viewsets.ReadOnlyModelViewSet,
        mixins.CreateModelMixin,
        BulkRetrieveMixin,
):
    serializer_class = serializers.CustomerSerializer
    permission_classes = [permissions.IsAdminUser]
    pagination_class = CommonPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['first_name', 'last_name', '=card_id']

    def get_queryset(self):
        qs = models.Customer.objects.all()
        # TODO - join with users
        return qs
