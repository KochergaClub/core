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

from .models import Shift
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

    items = Shift.objects.items_range(from_date, to_date)

    watchmen = list(kocherga.staff.models.Member.objects.filter(is_current=True).filter(role='WATCHMAN'))
    watchmen += list(kocherga.staff.models.Member.objects.filter(is_current=True).exclude(role='WATCHMAN'))

    return react_render(request, 'watchmen/index.tsx', {
        'schedule': serializers.ShiftSerializer(items, many=True).data,
        'editable': request.user.has_perm('watchmen.manage'),
        'from_date': from_date.strftime('%Y-%m-%d'),
        'to_date': to_date.strftime('%Y-%m-%d'),
        'watchmen': kocherga.staff.serializers.MemberSerializer(watchmen, many=True).data,
    })


class SetWatchmanForShift(WatchmenManagerMixin, View):
    def post(self, request):
        # FIXME - django form for validation
        shift_type = request.POST['shift']
        date_str = request.POST['date']
        watchman_name = request.POST['watchman']
        is_night = request.POST.get('is_night', False) == '1'

        date = datetime.strptime(date_str, '%Y-%m-%d').date()

        watchman = None
        if watchman_name:
            watchman = kocherga.staff.models.Member.objects.get(short_name=watchman_name)

        logger.info(f"Assigning {date}/{shift_type} to {watchman or is_night}")
        Shift.objects.update_or_create(
            shift=shift_type,
            date=date,
            defaults={
                'watchman': watchman,
                'is_night': is_night,
            },
        )

        return redirect('watchmen:index')
