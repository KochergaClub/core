import imghdr

from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from django.core.files.images import ImageFile
from kocherga.wagtail.models import CustomImage

from kocherga.error import PublicError


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

        image = CustomImage(title=title)
        image_type = imghdr.what(fh)
        if image_type == 'png':
            ext = 'png'
        elif image_type == 'jpeg':
            ext = 'jpg'
        else:
            raise Exception(f"Unknown image type {image_type}")

        last_image = CustomImage.objects.last()
        basename = str(last_image.pk + 1 if last_image else 1)

        image.file.save(basename + '.' + ext, ImageFile(fh))
        image.save()

        return Response({'ok': True, 'id': image.pk})
