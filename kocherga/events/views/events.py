import logging
logger = logging.getLogger(__name__)

from io import BytesIO
from datetime import datetime

import requests

from feedgen.feed import FeedGenerator

from django.http import HttpResponse, FileResponse
from django.views.decorators.http import require_safe
from django.conf import settings

from rest_framework.views import APIView
from rest_framework import status
from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, AllowAny

from kocherga.error import PublicError

import kocherga.events.db
from kocherga.events.models import Event
from kocherga.events import serializers

from kocherga.api.common import ok


class RootView(generics.ListCreateAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = serializers.EventSerializer

    def get_queryset(self):
        def arg2date(arg):
            d = self.request.query_params.get(arg)
            if d:
                d = datetime.strptime(d, "%Y-%m-%d").date()
            return d

        return Event.objects.list_events(
            date=arg2date("date"),
            from_date=arg2date("from_date"),
            to_date=arg2date("to_date"),
        ).prefetch_related('tags') \
         .prefetch_related('vk_announcement') \
         .prefetch_related('fb_announcement') \
         .prefetch_related('timepad_announcement')

    # TODO - replace with CreateAPIView after we standardize on `start` / `end` params on client
    def post(self, request, *args, **kwargs):
        if 'date' in request.data:
            (start_dt, end_dt) = kocherga.events.helpers.build_start_end_dt(
                self.request.data['date'],
                self.request.data['startTime'],
                self.request.data['endTime'],
            )
            data = {
                **request.data,
                'start': start_dt,
                'end': end_dt,
            }
        else:
            data = request.data

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ObjectView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = serializers.EventSerializer
    queryset = Event.objects.all()  # not list_events() - allows retrieving deleted objects
    lookup_url_kwarg = 'event_id'


class ImageView(APIView):
    permission_classes = (IsAdminUser,)

    def post(self, request, event_id, image_type):
        files = request.FILES
        if "file" not in files:
            raise PublicError("Expected a file")
        f = files["file"]

        if f.name == "":
            raise PublicError("No filename")

        event = Event.by_id(event_id)

        if image_type == 'vk':
            logger.warning('image_type=vk is deprecated, use POST /announcements/vk/{id}/image instead')
            event.vk_announcement.add_image(f)
        else:
            event.add_image(image_type, f)

        return Response(ok)

    def get(self, request, event_id, image_type):
        return FileResponse(
            open(
                Event.by_id(event_id).image_file(image_type),
                'rb'
            )
        )


class ImageFromUrlView(APIView):
    permission_classes = (IsAdminUser,)

    def post(self, request, event_id, image_type):
        payload = request.data

        url = payload["url"]
        r = requests.get(url)

        event = Event.by_id(event_id)
        fh = BytesIO(r.content)
        event.add_image(image_type, fh)

        return Response(ok)


class TagView(APIView):
    permission_classes = (IsAdminUser,)

    def post(self, request, event_id, tag_name):
        event = Event.by_id(event_id)
        event.add_tag(tag_name)

        return Response(ok)

    def delete(self, request, event_id, tag_name):
        event = Event.by_id(event_id)
        event.delete_tag(tag_name)

        return Response(ok)


class PublicEventsViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = serializers.PublicEventSerializer

    def get_queryset(self):
        def arg2date(arg):
            d = self.request.query_params.get(arg)
            if d:
                d = datetime.strptime(d, "%Y-%m-%d").date()
            return d

        events = Event.objects.public_events(
            date=arg2date('date'),
            from_date=arg2date('from_date'),
            to_date=arg2date('to_date'),
            tag=self.request.query_params.get('tag'),
        ).prefetch_related('tags') \
         .prefetch_related('vk_announcement') \
         .prefetch_related('fb_announcement') \
         .prefetch_related('timepad_announcement')

        # TODO - pager or limit queryset (but I can't do this right now because DetailView would break)
        return events


@api_view()
@permission_classes((AllowAny,))
def r_list_public_today(request):
    events = Event.objects.public_events(
        date=datetime.today().date(),
        tag=request.query_params.get('tag'),
    ).prefetch_related('tags') \
        .prefetch_related('vk_announcement') \
        .prefetch_related('fb_announcement') \
        .prefetch_related('timepad_announcement')

    return Response([
        serializers.PublicEventSerializer(event).data
        for event in events[:1000]
    ])


@require_safe
def r_list_public_atom(request):
    events = Event.objects.public_events(
        from_date=datetime.now().date(),
        tag=request.GET.get('tag'),
    ) \
        .prefetch_related('tags') \
        .prefetch_related('vk_announcement') \
        .prefetch_related('fb_announcement') \
        .prefetch_related('timepad_announcement')

    fg = FeedGenerator()
    fg.id(f'{settings.KOCHERGA_API_ROOT}/public_events_atom')  # should we add query params here?
    fg.title('Публичные мероприятия Кочерги')
    fg.author({'name': 'Кочерга'})

    for event in reversed(events.all()):
        fe = fg.add_entry()
        fe.id(f'{settings.KOCHERGA_API_ROOT}/public_event/{event.google_id}')
        dt = event.start
        fe.title(event.title)

        dt_str = kocherga.dateutils.weekday(dt).capitalize() \
            + ', ' + str(dt.day) \
            + ' ' + kocherga.dateutils.inflected_month(dt) \
            + ', ' + dt.strftime('%H:%M')

        fe.summary(dt_str)
        fe.content(dt_str)
        fe.link(href=event.vk_announcement.link)

    return HttpResponse(fg.atom_str(pretty=True))
