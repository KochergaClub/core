from rest_framework import viewsets, mixins, permissions, pagination
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models, serializers


class OrderPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class OrderViewSet(viewsets.ReadOnlyModelViewSet, mixins.CreateModelMixin):
    serializer_class = serializers.OrderSerializer
    permission_classes = [permissions.IsAdminUser]
    pagination_class = OrderPagination

    def get_queryset(self):
        qs = models.Order.objects.all()
        status = self.request.query_params.get('status')
        if status:
            qs = qs.filter_by_status(status)
        return qs

    @action(detail=True, methods=['POST'])
    def close(self, request, pk=None):
        order = self.get_object()
        order.close()

        return Response('ok')
