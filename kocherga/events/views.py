from django.views import View
from django.contrib.auth.mixins import UserPassesTestMixin

from kocherga.django.react import react_render

from .models import Event
from .serializers import EventSerializer

from datetime import datetime, timedelta
from kocherga.dateutils import TZ


class FullCalendarViewerMixin(UserPassesTestMixin):
    def test_func(self):
        return self.request.user.is_staff


class MainView(FullCalendarViewerMixin, View):
    def get(self, request):
        from_date = (datetime.now(TZ) - timedelta(weeks=3)).date()
        to_date = (datetime.now(TZ) + timedelta(weeks=3)).date()

        events = Event.objects.list_events(
            from_date=from_date,
            to_date=to_date,
        )

        return react_render(request, 'events/index.tsx', {
            "events": EventSerializer(events, many=True).data,
            "range": {
                "start": from_date.strftime('%Y-%m-%d'),
                "end": to_date.strftime('%Y-%m-%d'),
            },
        })
