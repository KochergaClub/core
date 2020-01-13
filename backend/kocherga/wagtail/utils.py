from django.db.models import Q
from wagtail.core.models import PageViewRestriction


# Copy-pasted from old REST API
def filter_queryset_by_page_permissions(request, queryset):
    q = Q()
    for restriction in PageViewRestriction.objects.all():
        if restriction.accept_request(request):
            continue
        q &= ~queryset.descendant_of_q(restriction.page, inclusive=True)

    return queryset.filter(q)
