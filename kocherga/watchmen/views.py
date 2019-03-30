import logging
logger = logging.getLogger(__name__)

from datetime import datetime, timedelta

from django.views import View
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import redirect
from django.contrib.auth.mixins import UserPassesTestMixin

from kocherga.django.react import react_render
import kocherga.staff.models
import kocherga.staff.serializers

from .models import ScheduleItem
from . import serializers


class WatchmenManagerMixin(UserPassesTestMixin):
    def test_func(self):
        return self.request.user.has_perm('watchmen.manage')


@staff_member_required
def index(request):
    from_date_str = request.GET.get('from_date', None)
    if from_date_str:
        from_date = datetime.strptime(from_date_str, '%Y-%m-%d').date()
    else:
        # start of last week
        from_date = datetime.today().date()
        from_date -= timedelta(days=from_date.weekday())

    to_date = from_date + timedelta(weeks=4)

    items = ScheduleItem.objects.items_range(from_date, to_date)

    return react_render(request, 'watchmen/index.tsx', {
        'schedule': serializers.ScheduleItemSerializer(items, many=True).data,
        'editable': request.user.has_perm('watchmen.manage'),
        'from_date': from_date.strftime('%Y-%m-%d'),
        'to_date': to_date.strftime('%Y-%m-%d'),
        'watchmen': kocherga.staff.serializers.MemberSerializer(
            kocherga.staff.models.Member.objects.filter(is_current=True),
            many=True
        ).data,
    })


class SetWatchmanForShift(WatchmenManagerMixin, View):
    def post(self, request):
        shift = request.POST['shift']
        date_str = request.POST['date']
        watchman = request.POST['watchman']

        date = datetime.strptime(date_str, '%Y-%m-%d').date()

        logger.info(f"Assigning {date}/{shift} to {watchman}")
        ScheduleItem.objects.update_or_create(
            shift=shift,
            date=date,
            defaults={'watchman_name': watchman},
        )

        return redirect('watchmen:index')
