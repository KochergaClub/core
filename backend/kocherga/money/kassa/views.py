import logging

logger = logging.getLogger(__name__)

from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def r_webhook(request):
    logger.info('Yandex.Kassa webhook')
    logger.info(request.data)
    return HttpResponse('ok')
