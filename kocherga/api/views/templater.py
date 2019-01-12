import logging
logger = logging.getLogger(__name__)

from django.views.decorators.http import require_safe
from django.http import JsonResponse, HttpResponse

import asyncio

import kocherga.config
from kocherga.templater import Template
from kocherga.api.auth import auth

def get_args(args):
    result = {}

    for k, v in args.items():
        result[k] = v

    return result


@require_safe
def r_html(request, name):
    template = Template.by_name(name)
    args = get_args(request.GET)
    return HttpResponse(template.generate_html(args))


@require_safe
def r_png(request, name):
    template = Template.by_name(name)
    args = get_args(request.GET)

    loop = asyncio.get_event_loop()
    image_bytes = loop.run_until_complete(template.generate_png(args))

    return HttpResponse(image_bytes, content_type='image/png')


@auth("kocherga")
def r_schema(request, name):
    template = Template.by_name(name)
    return JsonResponse(template.schema.to_dict())


@auth("kocherga")
def r_list(request):
    names = kocherga.templater.list_templates()
    return JsonResponse([
        {
            "name": name,
            "schema": Template.by_name(name).schema.to_dict(),
        }
        for name in names
    ], safe=False)
