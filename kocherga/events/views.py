from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

from kocherga.django.react import react_render

from .models import Event
from .serializers import PublicEventSerializer

from datetime import datetime, timedelta
from kocherga.dateutils import TZ


class MainView(LoginRequiredMixin, View):
    def get(self, request):
        events = Event.objects.filter(
            start__gte=datetime.now(TZ) - timedelta(weeks=3),
            end__lte=datetime.now(TZ) + timedelta(weeks=3),
            event_type='public',
        )

        return react_render(request, 'events/index.tsx', {
            "events": PublicEventSerializer(events, many=True).data,
        })
