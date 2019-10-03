import logging
logger = logging.getLogger(__name__)

from datetime import datetime
import enum
from io import BytesIO

import requests
from django.db import models

from kocherga.dateutils import TZ
import kocherga.watchmen.schedule
import kocherga.watchmen.models

from .pbx_call import PbxCall


def call_path(call, filename):
    return f'zadarma/calls/records/{call.call_id}.mp3'


class CallType(enum.Enum):
    incoming = 1
    outcoming = 2

    @classmethod
    def from_api_data(cls, data) -> "CallType":
        if data['pbx_call_id'].startswith('in_'):
            return cls.incoming
        if data['pbx_call_id'].startswith('out_'):
            return cls.outcoming
        raise Exception(f"Can't detect call type by data {data}")


class Call(models.Model):
    call_id = models.CharField(primary_key=True, max_length=100)
    pbx_call = models.ForeignKey(PbxCall, on_delete=models.CASCADE, related_name='calls')

    ts = models.DateTimeField()
    call_type = models.CharField(max_length=15)
    disposition = models.CharField(max_length=40)
    clid = models.CharField(max_length=100, blank=True)
    destination = models.CharField(max_length=20)
    sip = models.CharField(max_length=100)
    seconds = models.IntegerField()
    is_recorded = models.IntegerField()
    watchman = models.CharField(max_length=100)

    record = models.FileField(blank=True, upload_to=call_path)

    class Meta:
        db_table = 'zadarma_calls'
        verbose_name = 'Звонок'
        verbose_name_plural = 'Звонки'
        ordering = ['-ts']
        permissions = (
            ('listen', 'Может слушать звонки'),  # deprecated
            ('admin', 'Может администрировать звонки'),
        )

    def __str__(self):
        return f'[{self.ts}] {self.call_type} {self.clid} ---> {self.destination}'

    # TODO - move to Manager
    @classmethod
    def from_api_data(cls, pbx_call: PbxCall, data) -> "Call":
        args = {}
        for arg in ('disposition', 'clid', 'sip', 'seconds'):
            args[arg] = data[arg]

        if data['pbx_call_id'] != pbx_call.pbx_call_id:
            raise Exception("Code logic error - pbx_call doesn't match data")

        call_id = data['call_id']
        (call, _) = Call.objects.update_or_create(
            call_id=call_id,
            defaults={
                'ts': datetime.strptime(data['callstart'], "%Y-%m-%d %H:%M:%S").replace(tzinfo=TZ),
                'call_type': CallType.from_api_data(data).name,
                'is_recorded': (data['is_recorded'] == 'true'),
                'destination': str(data['destination']),
                'pbx_call': pbx_call,
                **args,
            }
        )

        if 'record_link' in data and not call.record:
            logger.info(f'Fetching recording for {call_id}')
            r = requests.get(data['record_link'])
            r.raise_for_status()
            call.record.save('record.mp3', BytesIO(r.content))

        # TODO - move `watchman` from Call to PbxCall, since it's the same for all calls.
        # (We store the actual responder in PbxCallData model.)
        # Also, voice recognition would be nice to have :)
        try:
            shift = kocherga.watchmen.schedule.shift_by_dt(
                datetime.fromtimestamp(call.ts.timestamp(), TZ)
            )
            if shift.watchman:
                call.watchman = shift.watchman.member.short_name
        except kocherga.watchmen.models.Shift.DoesNotExist:
            pass  # that's ok

        call.save()
        return call
