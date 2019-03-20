from django.contrib.admin.views.decorators import staff_member_required

from kocherga.django.react import react_render

from .models import ScheduleItem
from . import serializers

from datetime import datetime, timedelta


@staff_member_required
def index(request):
    items = ScheduleItem.objects.filter(date__gt=datetime.today() - timedelta(days=7 * 4))

    return react_render(request, 'watchmen/index.tsx', {
        'schedule': serializers.ScheduleItemSerializer(items, many=True).data,
    })
