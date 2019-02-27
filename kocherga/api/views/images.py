import logging
logger = logging.getLogger(__name__)

from django.http import FileResponse
from django.views.decorators.http import require_safe

from kocherga.images import image_storage


@require_safe
def r_image(request, image_id):
    filename = image_storage.get_filename(image_id)
    return FileResponse(open(filename, 'rb'))
