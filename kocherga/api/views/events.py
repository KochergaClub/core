import logging
logger = logging.getLogger(__name__)

from django.http import JsonResponse, HttpResponse, FileResponse
from django.views import View
from django.views.decorators.http import require_safe
from django.conf import settings

import sys
import json
from datetime import datetime
import requests
from werkzeug.contrib.iterio import IterIO

from kocherga.error import PublicError

import kocherga.events.db
from kocherga.events.models import Event, Tag

from kocherga.api.common import ok
from kocherga.api.auth import auth

from kocherga.datetime import MSK_DATE_FORMAT

from feedgen.feed import FeedGenerator

class RootView(View):
    @auth("kocherga", method=True)
    def get(self, request):
        def arg2date(arg):
            d = request.GET.get(arg)
            if d:
                d = datetime.strptime(d, "%Y-%m-%d").date()
            return d

        events = kocherga.events.db.list_events(
            date=request.GET.get("date"),
            from_date=arg2date("from_date"),
            to_date=arg2date("to_date"),
        )
        return JsonResponse([e.to_dict() for e in events], safe=False)


    @auth("kocherga", method=True)
    def post(self, request):
        payload = json.loads(request.body)
        for field in ("title", "date", "startTime", "endTime"):
            if field not in payload:
                raise PublicError("field {} is required".format(field))

        title = payload['title']
        (start_dt, end_dt) = kocherga.events.helpers.build_start_end_dt(payload['date'], payload['startTime'], payload['endTime'])

        event = Event(title=title, start_dt=start_dt, end_dt=end_dt)

        kocherga.events.db.insert_event(event)

        return JsonResponse(event.to_dict())


class ObjectView(View):
    @auth("kocherga", method=True)
    def get(self, request, event_id):
        event = Event.by_id(event_id)
        return JsonResponse(event.to_dict())


    @auth("kocherga", method=True)
    def patch(self, request, event_id):
        payload = json.loads(request.body)

        event = Event.by_id(event_id)
        event.patch(payload)

        return JsonResponse(event.to_dict())


    @auth("kocherga")
    def delete(self, request, event_id):
        event = Event.by_id(event_id)
        event.delete()
        event.patch_google()

        return JsonResponse(ok)


class PropertyView(View):
    @auth("kocherga", method=True)
    def post(self, request, event_id, key):
        value = json.loads(request.body)["value"]

        event = Event.by_id(event_id)
        event.patch({ key: value })

        return JsonResponse(ok)


class ImageView(View):
    @auth("kocherga", method=True)
    def post(self, request, event_id, image_type):
        files = request.FILES
        if "file" not in files:
            raise PublicError("Expected a file")
        f = files["file"]

        if f.name == "":
            raise PublicError("No filename")

        event = Event.by_id(event_id)
        event.add_image(image_type, f)

        return JsonResponse(ok)

    def get(self, request, event_id, image_type):
        return FileResponse(
            open(
                Event.by_id(event_id).image_file(image_type),
                'rb'
            )
        )


class ImageFromUrlView(View):
    @auth("kocherga", method=True)
    def post(self, request, event_id, image_type):
        payload = json.loads(request.body)

        url = payload["url"]
        r = requests.get(url, stream=True)

        event = Event.by_id(event_id)
        event.add_image(image_type, IterIO(r.raw.stream(4096, decode_content=True)))

        return JsonResponse(ok)


class TagView(View):
    @auth('kocherga', method=True)
    def post(self, request, event_id, tag_name):
        event = Event.by_id(event_id)
        event.add_tag(tag_name)

        return JsonResponse(ok)

    @auth('kocherga', method=True)
    def delete(self, request, event_id, tag_name):
        event = Event.by_id(event_id)
        event.delete_tag(tag_name)

        return JsonResponse(ok)


@require_safe
def r_list_public(request):
    def arg2date(arg):
        d = request.GET.get(arg)
        if d:
            d = datetime.strptime(d, "%Y-%m-%d").date()
        return d

    events = Event.objects.public_events(
        date=arg2date('date'),
        from_date=arg2date('from_date'),
        to_date=arg2date('to_date'),
        tag=request.GET.get('tag'),
    )
    return JsonResponse([
        event.public_object()
        for event in events[:1000]
    ], safe=False)

@require_safe
def r_list_public_today(request):
    events = Event.objects.public_events(
        date=datetime.today().date(),
        tag=request.GET.get('tag'),
    )
    return JsonResponse([
        event.public_object()
        for event in events[:1000]
    ], safe=False)

@require_safe
def r_list_public_atom(request):
    events = Event.objects.public_events(
        from_date=datetime.now().date(),
        tag=request.GET.get('tag'),
    )

    fg = FeedGenerator()
    fg.id(f'{settings.KOCHERGA_API_ROOT}/public_events_atom') # should we add query params here?
    fg.title('Публичные мероприятия Кочерги')
    fg.author({ 'name': 'Кочерга' })

    for event in reversed(events.all()):
        item = event.public_object()
        fe = fg.add_entry()
        fe.id(f'{settings.KOCHERGA_API_ROOT}/public_event/{item["event_id"]}')
        dt = datetime.strptime(item["start"], MSK_DATE_FORMAT)
        fe.title(item["title"])
        dt_str = kocherga.datetime.weekday(dt).capitalize() + ', ' + str(dt.day) + ' ' + kocherga.datetime.inflected_month(dt) + ', ' + dt.strftime('%H:%M')
        fe.summary(dt_str)
        fe.content(dt_str)
        fe.link(href=item["announcements"]["vk"]["link"])

    return HttpResponse(fg.atom_str(pretty=True))
