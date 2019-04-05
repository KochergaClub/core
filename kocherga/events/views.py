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
        events = Event.objects.filter(
            start__gte=datetime.now(TZ) - timedelta(weeks=3),
            end__lte=datetime.now(TZ) + timedelta(weeks=3),
        )

        return react_render(request, 'events/index.tsx', {
            "events": EventSerializer(events, many=True).data,
        })
