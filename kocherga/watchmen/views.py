import logging
logger = logging.getLogger(__name__)

from datetime import datetime, timedelta

from rest_framework import generics
from rest_framework import permissions

from . import serializers
from .models import Shift, Watchman


class ShiftList(generics.ListAPIView):
    serializer_class = serializers.ShiftSerializer
    permission_classes = (permissions.IsAdminUser,)

    def get_queryset(self):
        from_date_str = self.request.query_params.get('from_date', None)
        if from_date_str:
            from_date = datetime.strptime(from_date_str, '%Y-%m-%d').date()
        else:
            # start of last week
            from_date = datetime.today().date()
            from_date -= timedelta(days=from_date.weekday())

        to_date = from_date + timedelta(weeks=4) - timedelta(days=1)

        items = Shift.objects.items_range(from_date, to_date)
        return items


class IsManagerUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('watchmen.manage')


class ShiftUpdate(generics.UpdateAPIView):
    serializer_class = serializers.UpdateShiftSerializer
    permission_classes = (IsManagerUser,)

    def get_object(self):
        (shift, _) = Shift.objects.get_or_create(date=self.kwargs['date'], shift=self.kwargs['shift'])
        logger.info(self.request.data)
        return shift


class WatchmenView(generics.ListAPIView):
    serializer_class = serializers.WatchmanSerializer
    permission_classes = (permissions.IsAdminUser,)
    queryset = Watchman.objects.all()
