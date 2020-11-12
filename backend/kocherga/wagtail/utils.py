import imghdr
from typing import Optional

from django.contrib.auth import get_user_model
from django.core.files.images import ImageFile
from django.db.models import Q

from wagtail.core.models import Collection, PageViewRestriction, Site

from .models import CustomImage, KochergaPage

User = get_user_model()


# Copy-pasted from old REST API
def filter_queryset_by_page_permissions(request, queryset):
    q = Q()
    for restriction in PageViewRestriction.objects.all():
        if restriction.accept_request(request):
            continue
        q &= ~queryset.descendant_of_q(restriction.page, inclusive=True)

    return queryset.filter(q)


def check_add_image_permissions_for_collection(
    user: User,
    collection: Collection,
):
    import wagtail.images.permissions

    allowed_collections = wagtail.images.permissions.permission_policy.collections_user_has_permission_for(
        user, 'add'
    )
    if collection.pk not in [c.pk for c in allowed_collections]:
        raise Exception("Access denied")


def create_image_from_fh(
    fh,
    title,
    basename,
    # user parameter is required and should be set explicitly to None if you don't need a permission check
    user: Optional[User],
    collection: Collection,
    check_permission: bool = True,  # permission could be checked earlier, e.g. in wagtailUploadImageFromUrl mutation
) -> CustomImage:
    if user and check_permission:
        check_add_image_permissions_for_collection(user, collection)

    image = CustomImage(
        title=title,
        collection=collection,
        uploaded_by_user=user,
    )
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
    image.full_clean()
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
