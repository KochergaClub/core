import imghdr

from django.db.models import Q
from django.core.files.images import ImageFile

from wagtail.core.models import PageViewRestriction, Site
from .models import CustomImage, KochergaPage


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


# Simplified from https://github.com/wagtail/wagtail/blob/master/wagtail/api/v2/endpoints.py
# to allow non-public pages in API.
def get_page_queryset_for_request(request):
    queryset = KochergaPage.objects.all()

    # Get live pages that are not in a private section
    queryset = filter_queryset_by_page_permissions(request, queryset)

    # Get live pages only
    queryset = queryset.live()

    # Filter by site
    site = Site.find_for_request(request)
    if site:
        queryset = queryset.descendant_of(site.root_page, inclusive=True)
    else:
        # No sites configured
        queryset = queryset.none()

    return queryset
