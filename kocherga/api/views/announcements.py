import logging
logger = logging.getLogger(__name__)

import json
import sys
from datetime import datetime, timedelta

from django.http import JsonResponse, FileResponse
from django.views.decorators.http import require_safe, require_POST

from kocherga.error import PublicError

from kocherga.images import image_storage
from kocherga.events.event import Event
import kocherga.events.timepad
import kocherga.events.vk
import kocherga.events.telegram
import kocherga.events.announce
import kocherga.email.weekly_digest

from kocherga.api.auth import auth
from kocherga.api.common import ok

# Idea: workflows for announcements.
# /workflow/timepad -> returns { 'steps': ['post-draft', 'publish'], 'current-step': ... }
# /workflow/timepad/post-draft
# /workflow/timepad/publish


@auth("kocherga")
@require_POST
def r_timepad_post(request, event_id):
    event = Event.objects.get(pk=event_id)
    announcement = kocherga.events.announce.post_to_timepad(event)

    return JsonResponse({"link": announcement.link})


@auth("kocherga")
@require_safe
def r_timepad_categories(request):
    categories = kocherga.events.timepad.timepad_categories()
    return JsonResponse([
        {
            "id": c.id, "name": c.name, "code": c.code
        } for c in categories
    ], safe=False)


@auth("kocherga")
@require_safe
def r_vk_groups():
    all_groups = kocherga.events.vk.all_groups()
    return JsonResponse(all_groups, safe=False)


@auth("kocherga")
@require_POST
def r_vk_update_wiki_schedule(request):
    kocherga.events.vk.update_wiki_schedule()
    return JsonResponse(ok)


@auth("kocherga")
@require_POST
def r_vk_create_schedule_post(request):
    kocherga.events.vk.create_schedule_post('')
    return JsonResponse(ok)


@auth("kocherga")
@require_POST
def r_telegram_post_schedule(request):
    kocherga.events.telegram.post_schedule()
    return JsonResponse(ok)


@auth("kocherga")
@require_POST
def r_email_post_digest(request):
    text = json.loads(request.body).get('text', '')
    kocherga.email.weekly_digest.create_draft(text)
    return JsonResponse(ok)


@require_POST
@auth("kocherga")
def r_vk_post(request, event_id):
    event = Event.by_id(event_id)
    announcement = kocherga.events.announce.post_to_vk(event)

    return JsonResponse({"link": announcement.link})


@require_safe
@auth("kocherga")
def r_fb_groups():
    all_groups = kocherga.events.fb.all_groups()
    return JsonResponse(all_groups, safe=False)


@require_POST
@auth("kocherga")
def r_fb_post(request, event_id):
    access_token = (json.loads(request.body))["fb_access_token"]

    event = Event.by_id(event_id)
    announcement = kocherga.events.announce.post_to_fb(event, access_token)

    return JsonResponse({"link": announcement.link})


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
    except:
        error = str(sys.exc_info())
        raise PublicError(error)

    logger.info(f'Serving weekly image file {filename}')
    return FileResponse(open(filename, 'rb'))


@require_safe
def r_last_screenshot(request):
    filename = image_storage.screenshot_file("error")
    return FileResponse(open(filename, 'rb'))
