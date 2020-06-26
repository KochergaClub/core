import logging

logger = logging.getLogger(__name__)

from rest_framework.views import APIView
from rest_framework import mixins, viewsets, exceptions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from datetime import datetime

from kocherga.dateutils import TZ

from kocherga.events.models import EventPrototype
from kocherga.events.serializers import (
    EventSerializer,
    EventPrototypeSerializer,
    DetailedEventPrototypeSerializer,
)

from kocherga.api.common import ok


class RootViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    permission_classes = (IsAdminUser,)
    queryset = EventPrototype.objects.order_by('weekday').all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return DetailedEventPrototypeSerializer
        else:
            return EventPrototypeSerializer

    @action(detail=True)
    def instances(self, request, pk=None):
        prototype = self.get_object()
        events = prototype.instances()
        return Response(EventSerializer(events, many=True).data)

    @action(detail=True, methods=['POST'], url_path=r'cancel_date/(?P<date_str>[^/.]+)')
    def cancel_date(self, request, date_str, pk=None):
        prototype = self.get_object()
        prototype.cancel_date(datetime.strptime(date_str, '%Y-%m-%d').date())
        prototype.save()

        return Response(ok)

    @action(detail=True, methods=['POST'])
    def new(self, request, pk=None):
        """Create new event using this prototype."""
        prototype = self.get_object()

        payload = request.data
        ts = payload["ts"]

        dt = datetime.fromtimestamp(ts, TZ)
        event = prototype.new_event(dt)

        return Response(EventSerializer(event).data)

    @action(detail=True, methods=['POST'])
    def image(self, request, pk=None):
        files = request.FILES
        if "file" not in files:
            raise exceptions.ValidationError("Expected a file")
        f = files["file"]

        if f.name == "":
            raise exceptions.ValidationError("No filename")

        prototype = self.get_object()
        prototype.add_image(f)

        return Response(ok)


class TagView(APIView):
    permission_classes = (IsAdminUser,)

    def post(self, prototype_id, tag_name):
        prototype = EventPrototype.by_id(prototype_id)
        prototype.add_tag(tag_name)

        return Response(ok)

    def delete(self, prototype_id, tag_name):
        prototype = EventPrototype.by_id(prototype_id)
        prototype.delete_tag(tag_name)

        return Response(ok)
