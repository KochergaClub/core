import logging
logger = logging.getLogger(__name__)

from rest_framework import viewsets

from . import models, serializers, permissions


class RecordViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Record.objects.all()
    permission_classes = (permissions.IsRecordViewer,)
    serializer_class = serializers.RecordSerializer
