from django.db import models

from kocherga.django.managers import RelayQuerySet
from kocherga.staff.models import Member


class PbxCall(models.Model):
    pbx_call_id = models.CharField(primary_key=True, max_length=100)
    ts = models.DateTimeField()

    objects = RelayQuerySet.as_manager()

    class Meta:
        verbose_name = 'АТС-звонок'
        verbose_name_plural = 'АТС-звонки'
        ordering = ['-ts']

    def set_staff_member_by_id(self, member_id):
        staff_member = Member.objects.get(pk=member_id)
        try:
            self.data
        except PbxCall.data.RelatedObjectDoesNotExist:
            self.data = PbxCallData(pbx_call=self)
        self.data.staff_member = staff_member
        self.data.save()


class PbxCallData(models.Model):
    pbx_call = models.OneToOneField(
        PbxCall, on_delete=models.PROTECT, related_name='data'
    )
    staff_member = models.ForeignKey(
        Member, null=True, blank=True, on_delete=models.PROTECT, related_name='+'
    )
