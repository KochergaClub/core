from django.contrib.admin.views.decorators import staff_member_required

from kocherga.django.react import react_render

from .models import Member
from . import serializers


@staff_member_required
def index_page(request):
    members = Member.objects.full_list()
    return react_render(request, 'staff/index_page', {
        'members': serializers.MemberSerializer(members, many=True).data
    })


@staff_member_required
def member_page(request, member_id):
    member = Member.objects.get(pk=member_id)
    return react_render(request, 'staff/member_page', {
        'current_user_is_manager': request.user.has_perm('staff.manage'),
        'member': serializers.MemberSerializer(member).data
    })
