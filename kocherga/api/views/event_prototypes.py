import logging
logger = logging.getLogger(__name__)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser

from datetime import datetime

from kocherga.error import PublicError
from kocherga.dateutils import TZ

from kocherga.events.models import EventPrototype
from kocherga.events.serializers import EventSerializer, EventPrototypeSerializer, DetailedEventPrototypeSerializer

from kocherga.api.common import ok


class RootView(APIView):
    permission_classes = (IsAdminUser,)

    def get(self, request):
        prototypes = EventPrototype.objects.order_by('weekday').all()
        return Response(
            DetailedEventPrototypeSerializer(prototypes, many=True).data
        )

    def post(self, request):
        payload = request.data

        required_fields = ("title", "location", "weekday", "hour", "minute", "length")
        optional_fields = (
            "vk_group",
            "fb_group",
            "summary",
            "description",
            "timepad_category_code",
            "timepad_prepaid_tickets",
            "timing_description_override",
        )

        props = {}
        for field in required_fields:
            if field not in required_fields:
                raise PublicError(f"Field {field} is required")

            props[field] = payload[field]
        for field in optional_fields:
            if field in payload:
                props[field] = payload[field]

        prototype = EventPrototype(**props)
        prototype.clean()
        prototype.save()

        return Response(ok)


class ObjectView(APIView):
    permission_classes = (IsAdminUser,)

    def get(self, request, prototype_id):
        prototype = EventPrototype.by_id(prototype_id)
        return Response(
            DetailedEventPrototypeSerializer(prototype).data
        )

    def patch(self, request, prototype_id):
        payload = request.data

        prototype = EventPrototype.by_id(prototype_id)

        for (key, value) in payload.items():
            if key in (
                    "title",
                    "description",
                    "summary",
                    "location",
                    "weekday",
                    "hour",
                    "minute",
                    "length",
                    "vk_group",
                    "fb_group",
                    "active",
                    "timepad_category_code",
                    "timepad_prepaid_tickets",
                    "timing_description_override",
            ):
                setattr(prototype, key, value)
            else:
                raise Exception("Key {} is not allowed in patch".format(key))

        prototype.clean()
        prototype.save()

        return Response(
            EventPrototypeSerializer(prototype).data
        )


@api_view()
@permission_classes((IsAdminUser,))
def r_prototype_instances(request, prototype_id):
    prototype = EventPrototype.by_id(prototype_id)
    events = prototype.instances()
    return Response(EventSerializer(events, many=True).data)


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def r_prototype_cancel_date(request, prototype_id, date_str):
    prototype = EventPrototype.by_id(prototype_id)
    prototype.cancel_date(datetime.strptime(date_str, '%Y-%m-%d').date())
    prototype.save()

    return Response(ok)


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def r_prototype_new_event(request, prototype_id):
    payload = request.data
    ts = payload["ts"]

    prototype = EventPrototype.by_id(prototype_id)
    dt = datetime.fromtimestamp(ts, TZ)
    event = prototype.new_event(dt)

    return Response(EventSerializer(event).data)


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def r_upload_image(request, prototype_id):
    files = request.FILES
    if "file" not in files:
        raise PublicError("Expected a file")
    f = files["file"]

    if f.name == "":
        raise PublicError("No filename")

    prototype = EventPrototype.by_id(prototype_id)
    prototype.add_image(f)

    return Response(ok)


class TagView(APIView):
    permission_classes = (IsAdminUser,)

    def post(self, prototype_id, tag_name):
        prototype = EventPrototype.by_id(prototype_id)
        prototype.add_tag(tag_name)

        return Response(ok)

    def delete(prototype_id, tag_name):
        prototype = EventPrototype.by_id(prototype_id)
        prototype.delete_tag(tag_name)

        return Response(ok)
