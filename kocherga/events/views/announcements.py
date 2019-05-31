import logging
logger = logging.getLogger(__name__)

import sys
from datetime import datetime, timedelta

from django.http import FileResponse
from django.views.decorators.http import require_safe

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser

from kocherga.error import PublicError

from kocherga.images import image_storage
from kocherga.events.models import Event, WeeklyDigest
import kocherga.events.timepad
import kocherga.events.vk
import kocherga.events.announce

from kocherga.api.common import ok

# Idea: workflows for announcements.
# /workflow/timepad -> returns { 'steps': ['post-draft', 'publish'], 'current-step': ... }
# /workflow/timepad/post-draft
# /workflow/timepad/publish


class TimepadPostView(APIView):
    permission_classes = (IsAdminUser,)

    def post(self, request, event_id):
        event = Event.objects.get(pk=event_id)
        announcement = kocherga.events.announce.post_to_timepad(event)

        return Response({"link": announcement.link})


class TimepadCategoriesView(APIView):
    permission_classes = (IsAdminUser,)

    def get(self, request):
        categories = kocherga.events.timepad.timepad_categories()
        return Response([
            {
                "id": c.id, "name": c.name, "code": c.code
            } for c in categories
        ])


@api_view()
@permission_classes((IsAdminUser,))
def r_vk_groups(request):
    all_groups = kocherga.events.vk.all_groups()
    return Response(all_groups)


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def r_vk_update_wiki_schedule(request):
    kocherga.events.vk.update_wiki_schedule()
    return Response(ok)


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def r_weekly_digest_post_vk(request):
    digest = WeeklyDigest.objects.current_digest()
    digest.post_vk('')
    return Response(ok)


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def r_weekly_digest_post_telegram(request):
    digest = WeeklyDigest.objects.current_digest()
    digest.post_telegram()
    return Response(ok)


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def r_weekly_digest_post_mailchimp_draft(request):
    text = request.data.get('text', '')
    digest = WeeklyDigest.objects.current_digest()
    digest.post_mailchimp_draft(text)
    return Response(ok)


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def r_vk_post(request, event_id):
    event = Event.by_id(event_id)
    announcement = kocherga.events.announce.post_to_vk(event)

    return Response({"link": announcement.link})


@api_view()
@permission_classes((IsAdminUser,))
def r_fb_groups(request):
    all_groups = kocherga.events.fb.all_groups()
    return Response(all_groups)


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def r_fb_post(request, event_id):
    event = Event.by_id(event_id)
    announcement = kocherga.events.announce.post_to_fb(event)

    return Response({"link": announcement.link})


# No auth - images are requested directly
# TODO - accept a token via CGI params? hmm...
@require_safe
def r_schedule_weekly_image(request):
    dt = datetime.today()
    if dt.weekday() < 2:
        dt = dt - timedelta(days=dt.weekday())
    else:
        dt = dt + timedelta(days=7 - dt.weekday())

    try:
        filename = image_storage.schedule_file(dt)
    except Exception:
        error = str(sys.exc_info())
        raise PublicError(error)

    logger.info(f'Serving weekly image file {filename}')
    return FileResponse(open(filename, 'rb'))


@require_safe
def r_last_screenshot(request):
    filename = image_storage.screenshot_file("error")
    return FileResponse(open(filename, 'rb'))
