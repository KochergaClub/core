import logging
logger = logging.getLogger(__name__)

from django.views.decorators.http import require_safe
from django.http import HttpResponse
from django.views.decorators.clickjacking import xframe_options_exempt

import asyncio

from . import models


def get_args(args):
    result = {}

    for k, v in args.items():
        result[k] = v

    return result


@require_safe
@xframe_options_exempt  # html templater is used on evenman.team.kocherga.club
def r_html(request, name):
    template = models.Template.by_name(name)
    args = get_args(request.GET)
    return HttpResponse(template.generate_html(args))


@require_safe
def r_png(request, name):
    template = models.Template.by_name(name)
    args = get_args(request.GET)

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    image_bytes = loop.run_until_complete(template.generate_png(args))

    return HttpResponse(image_bytes, content_type='image/png')
