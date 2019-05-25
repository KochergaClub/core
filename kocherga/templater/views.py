import logging
logger = logging.getLogger(__name__)

from django.views.decorators.http import require_safe
from django.http import HttpResponse
from django.views.decorators.clickjacking import xframe_options_exempt

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser

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


@api_view()
@permission_classes((IsAdminUser,))
def r_schema(request, name):
    template = models.Template.by_name(name)
    return Response(template.schema.to_dict())


def template2meta(template):
    (width, height) = template.sizes
    return {
        "name": template.name,
        "schema": template.schema.to_dict(),
        "sizes": {
            "width": width,
            "height": height,
        },
    }


@api_view()
@permission_classes((IsAdminUser,))
def r_meta(request, name):
    template = models.Template.by_name(name)

    return Response(template2meta(template))


@api_view()
@permission_classes((IsAdminUser,))
def r_list(request):
    names = models.list_templates()
    return Response([
        template2meta(models.Template.by_name(name))
        for name in names
    ])
