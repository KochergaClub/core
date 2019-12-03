from django.utils import timezone

import kocherga.staff.models
from kocherga.zadarma import models


def test_set_staff_member(common_team):
    pbx_call = models.PbxCall(pbx_call_id='fake', ts=timezone.now())
    pbx_call.save()

    member = kocherga.staff.models.Member.objects.first()
    pbx_call.set_staff_member_by_id(member.id)

    assert pbx_call.data
    assert pbx_call.data.staff_member == member


def test_call_from_api(common_team):
    pbx_call = models.PbxCall(pbx_call_id='in_fake', ts=timezone.now())
    pbx_call.save()

    call = models.Call.from_api_data(pbx_call, {
        'call_id': '1234567890.12345',
        'disposition': 'no answer',
        'destination': '74993502042',
        'clid': '+71111111111',
        'sip': 100,
        'seconds': 15,
        'callstart': '2019-04-01 12:00:00',
        'is_recorded': False,
        'pbx_call_id': pbx_call.pk,
    })

    assert isinstance(call, models.Call)
