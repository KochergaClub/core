import imghdr

from django.db.models import Q
from wagtail.core.models import PageViewRestriction
from django.core.files.images import ImageFile

from .models import CustomImage


# Copy-pasted from old REST API
def filter_queryset_by_page_permissions(request, queryset):
    q = Q()
    for restriction in PageViewRestriction.objects.all():
        if restriction.accept_request(request):
            continue
        q &= ~queryset.descendant_of_q(restriction.page, inclusive=True)

    return queryset.filter(q)


def create_image_from_fh(fh, title, basename) -> CustomImage:
    image = CustomImage(title=title)
    image_type = imghdr.what(fh)
    if image_type == 'png':
        ext = 'png'
    elif image_type == 'jpeg':
        ext = 'jpg'
    elif image_type == 'webp':
        ext = 'webp'
    else:
        raise Exception(f"Unknown image type {image_type}")

    image.file.save(basename + '.' + ext, ImageFile(fh))
    image.save()
    return image
