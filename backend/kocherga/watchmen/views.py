import logging
logger = logging.getLogger(__name__)

from datetime import datetime, timedelta

from rest_framework import generics, permissions, mixins, viewsets

from kocherga.django.drf import BulkRetrieveMixin

from . import serializers
from .models import Shift, Watchman, Grade


class IsManagerOrStaffRO(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_staff

        return request.user.has_perm('watchmen.manage')


class ShiftList(generics.ListAPIView):
    serializer_class = serializers.ShiftSerializer
    permission_classes = (IsManagerOrStaffRO,)

    def get_queryset(self):
        from_date_str = self.request.query_params.get('from_date', None)
        if from_date_str:
            from_date = datetime.strptime(from_date_str, '%Y-%m-%d').date()
        else:
            # start of last week
            from_date = datetime.today().date()
            from_date -= timedelta(days=from_date.weekday())

        to_date_str = self.request.query_params.get('to_date', None)
        if to_date_str:
            to_date = datetime.strptime(to_date_str, '%Y-%m-%d').date()
            if (to_date - from_date).days > 12 * 7:
                raise Exception("12 weeks max is allowed")
        else:
            to_date = from_date + timedelta(weeks=4) - timedelta(days=1)

        items = Shift.objects.items_range(from_date, to_date)
        return items


class ShiftUpdate(generics.UpdateAPIView):
    serializer_class = serializers.UpdateShiftSerializer
    permission_classes = (IsManagerOrStaffRO,)

    def get_object(self):
        (shift, _) = Shift.objects.get_or_create(date=self.kwargs['date'], shift=self.kwargs['shift'])
        logger.info(self.request.data)
        return shift


class WatchmenViewSet(
        mixins.UpdateModelMixin,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        viewsets.GenericViewSet,
        BulkRetrieveMixin,
):
    serializer_class = serializers.WatchmanSerializer
    permission_classes = (IsManagerOrStaffRO,)

    def get_queryset(self):
        queryset = Watchman.objects.all()
        if self.request.query_params.get('current'):
            queryset = queryset.filter(member__is_current=True).filter(priority__lt=3)

        return queryset


class GradesViewSet(
        viewsets.ReadOnlyModelViewSet,
        BulkRetrieveMixin,
):
    serializer_class = serializers.GradeSerializer
    permission_classes = (IsManagerOrStaffRO,)
    queryset = Grade.objects.all()
