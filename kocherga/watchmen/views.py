import logging
logger = logging.getLogger(__name__)

from datetime import datetime, timedelta

from django.contrib.admin.views.decorators import staff_member_required
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

    return react_render(request, 'watchmen/index', {
        'schedule': serializers.ShiftSerializer(items, many=True).data,
        'editable': request.user.has_perm('watchmen.manage'),
        'from_date': from_date.strftime('%Y-%m-%d'),
        'to_date': to_date.strftime('%Y-%m-%d'),
        'watchmen': kocherga.staff.serializers.MemberSerializer(watchmen, many=True).data,
    })
