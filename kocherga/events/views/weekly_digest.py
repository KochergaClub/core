import logging
logger = logging.getLogger(__name__)

import sys
from datetime import datetime, timedelta

from django.views.decorators.http import require_safe
from django.http import FileResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser

from kocherga.error import PublicError
from kocherga.api.common import ok
from kocherga.images import image_storage

from kocherga.events import models


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def r_post_vk(request):
    digest = models.WeeklyDigest.objects.current_digest()
    digest.post_vk('')
    return Response(ok)


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def r_post_telegram(request):
    digest = models.WeeklyDigest.objects.current_digest()
    digest.post_telegram()
    return Response(ok)


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def r_post_mailchimp_draft(request):
    text = request.data.get('text', '')
    digest = models.WeeklyDigest.objects.current_digest()
    digest.post_mailchimp_draft(text)
    return Response(ok)


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
