import logging
logger = logging.getLogger(__name__)

from io import BytesIO
from datetime import datetime

import requests

from django.utils import feedgenerator

from django.http import HttpResponse, FileResponse
from django.views.generic import View
from django.views.decorators.http import require_safe
from django.conf import settings

from rest_framework.views import APIView
from rest_framework import status, generics, viewsets, filters, pagination
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, AllowAny

from kocherga.error import PublicError

import kocherga.events.helpers
from kocherga.events.models import Event
from kocherga.events import serializers

from kocherga.api.common import ok


class RootView(generics.ListCreateAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = serializers.EventSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)
    lookup_field = 'uuid'

    def get_queryset(self):
        def arg2date(arg):
            d = self.request.query_params.get(arg)
            if d:
                d = datetime.strptime(d, "%Y-%m-%d").date()
            return d

        qs = Event.objects.list_events(
            date=arg2date("date"),
            from_date=arg2date("from_date"),
            to_date=arg2date("to_date"),
        ).prefetch_related('tags') \
         .prefetch_related('project') \
         .prefetch_related('prototype') \
         .select_related('vk_announcement') \
         .select_related('fb_announcement') \
         .select_related('timepad_announcement')
        return qs

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

        data['creator'] = request.user.email

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class EventsPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class PagedRootView(RootView):
    pagination_class = EventsPagination


class ObjectView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = serializers.EventSerializer
    queryset = Event.objects.all()  # not list_events() - allows retrieving deleted objects
    lookup_url_kwarg = 'event_id'
    lookup_field = 'uuid'


class ImageView(APIView):
    permission_classes = (IsAdminUser,)

    def post(self, request, event_id, image_type):
        files = request.FILES
        if "file" not in files:
            raise PublicError("Expected a file")
        f = files["file"]

        if f.name == "":
            raise PublicError("No filename")

        event = Event.objects.get(uuid=event_id)

        if image_type == 'vk':
            # TODO - is /announcements/vk/... even implemented?
            logger.warning('image_type=vk is deprecated, use POST /announcements/vk/{id}/image instead')
            event.vk_announcement.add_image(f)
        else:
            event.add_image(image_type, f)

        return Response(ok)

    def get(self, request, event_id, image_type):
        return FileResponse(
            open(
                Event.objects.get(uuid=event_id).image_file(image_type),
                'rb'
            )
        )


class ImageFromUrlView(APIView):
    permission_classes = (IsAdminUser,)

    def post(self, request, event_id, image_type):
        payload = request.data

        url = payload["url"]
        r = requests.get(url)

        event = Event.objects.get(uuid=event_id)
        fh = BytesIO(r.content)
        event.add_image(image_type, fh)

        return Response(ok)


class TagView(APIView):
    permission_classes = (IsAdminUser,)

    def post(self, request, event_id, tag_name):
        event = Event.objects.get(uuid=event_id)
        event.add_tag(tag_name)

        return Response(ok)

    def delete(self, request, event_id, tag_name):
        event = Event.objects.get(uuid=event_id)
        event.delete_tag(tag_name)

        return Response(ok)


class PublicEventsViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = serializers.PublicEventSerializer
    lookup_field = 'uuid'

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
        .prefetch_related('vk_announcement')

    fg = feedgenerator.Atom1Feed(
        title='Публичные мероприятия Кочерги',
        link=f'{settings.KOCHERGA_API_ROOT}/public_events_atom',  # should we add query params here?
        description='Публичные мероприятия Кочерги',
        author_name='Кочерга',
    )

    for event in reversed(events.all()):
        # fe.id(f'{settings.KOCHERGA_API_ROOT}/public_event/{event.uuid}')
        fg.add_item(
            title=event.title,
            link=event.vk_announcement.link,
            description=event.summary,
            pubdate=event.start,
        )

    return HttpResponse(fg.writeString('utf-8'))


class EventFeedbackView(APIView):
    permission_classes = (IsAdminUser,)

    def get(self, request, event_id):
        event = Event.objects.list_events().get(uuid=event_id)
        feedbacks = event.feedbacks.all()
        return Response(
            serializers.FeedbackSerializer(feedbacks, many=True).data
        )


class SitemapView(View):
    def get(self, request):
        events = Event.objects.public_events()
        return HttpResponse(''.join([
            f'{settings.KOCHERGA_WEBSITE}/events/{event.uuid}\n'
            for event in events
        ]), content_type='text/plain')