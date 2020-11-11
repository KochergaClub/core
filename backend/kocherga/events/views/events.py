import logging

logger = logging.getLogger(__name__)

from datetime import datetime

from django.conf import settings
from django.http import HttpResponse
from django.utils import feedgenerator
from django.views.decorators.http import require_safe
from django.views.generic import View
from kocherga.events.models import Event


@require_safe
def r_list_public_atom(request):
    qs = Event.objects.public_only().filter_by_period(
        from_date=datetime.now().date(),
    )
    tag = request.GET.get('tag')
    if tag:
        qs = qs.filter_by_tag(tag)

    qs = qs.prefetch_related('tags').prefetch_related('vk_announcement')

    fg = feedgenerator.Atom1Feed(
        title='Публичные мероприятия Кочерги',
        link=f'{settings.KOCHERGA_API_ROOT}/public_events_atom',  # should we add query params here?
        description='Публичные мероприятия Кочерги',
        author_name='Кочерга',
    )

    for event in reversed(qs):
        # fe.id(f'{settings.KOCHERGA_API_ROOT}/public_event/{event.uuid}')
        fg.add_item(
            title=event.title,
            link=event.public_link(),
            description=event.summary,
            pubdate=event.start,
        )

    return HttpResponse(fg.writeString('utf-8'))


class SitemapView(View):
    def get(self, request):
        events = Event.objects.public_only()
        return HttpResponse(
            ''.join(
                [
                    f'{settings.KOCHERGA_WEBSITE}/events/{event.uuid}\n'
                    for event in events
                ]
            ),
            content_type='text/plain',
        )
