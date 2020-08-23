from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from kocherga.wagtail.models import CustomImage

from kocherga.error import PublicError

from .utils import create_image_from_fh


class ImageView(APIView):
    permission_classes = (IsAdminUser,)

    def post(self, request):
        files = request.FILES
        if "file" not in files:
            raise PublicError("Expected a file")
        fh = files["file"]

        if fh.name == "":
            raise PublicError("No filename")

        title = request.data['title']

        last_image = CustomImage.objects.last()
        basename = str(last_image.pk + 1 if last_image else 1)

        image = create_image_from_fh(fh, title, basename)

        return Response({'ok': True, 'id': image.pk})
