import logging

logger = logging.getLogger(__name__)

from django.views.decorators.http import require_safe
from django.http import FileResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser

from kocherga.api.common import ok

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


# No auth - images are requested directly.
# TODO - deprecate and use url from weekly_digest props instead.
@require_safe
def r_schedule_weekly_image(request):
    digest = models.WeeklyDigest.objects.current_digest()

    digest.create_image_if_necessary()
    logger.info(f'Serving weekly image file')
    return FileResponse(digest.image.open('rb'), content_type='image/png')
