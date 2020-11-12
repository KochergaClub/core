import logging

logger = logging.getLogger(__name__)

from kocherga.error import PublicError
from kocherga.wagtail.models import CustomImage
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

import wagtail.core.models

from .utils import create_image_from_fh


class ImageView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        files = request.FILES
        if "file" not in files:
            raise PublicError("Expected a file")
        fh = files["file"]

        if fh.name == "":
            raise PublicError("No filename")

        title = request.data['title']
        basename = request.data['basename']

        if 'collection_id' not in request.data:
            raise PublicError("collection_id required")
        collection = wagtail.core.models.Collection.objects.get(
            pk=request.data['collection_id']
        )

        logger.info("Creating image object from file")
        image = create_image_from_fh(
            fh,
            title=title,
            basename=basename,
            user=request.user,
            collection=collection,
        )

        return Response({'ok': True, 'id': image.pk})
