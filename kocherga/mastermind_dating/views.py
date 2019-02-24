from django.contrib.admin.views.decorators import staff_member_required
from django.views.decorators.http import require_POST
from django.shortcuts import redirect

from datetime import datetime

from kocherga.django.react import react_render

from .models import Cohort, User
from . import serializers

@staff_member_required
def index(request):
    cohorts = Cohort.objects.all()

    props = {}
    props['cohorts'] = serializers.CohortSerializer(cohorts, many=True).data
    return react_render(request, 'mastermind_dating/index.tsx', props)

@staff_member_required
def cohort_page(request, cohort_id):
    cohort = Cohort.objects.get(id=cohort_id)

    props = {
        'cohort_id': cohort_id,
        'users': serializers.UserSerializer(cohort.users.all(), many=True).data
    }
    return react_render(request, 'mastermind_dating/cohort_page.tsx', props)

@staff_member_required
@require_POST
def tinder_activate(request, user_id):
    user = User.objects.get(user_id=user_id)
    user.tinder_activate()

    return redirect('mastermind_dating:cohort_page', cohort_id=user.cohort.id)

@staff_member_required
@require_POST
def flip_present(request, user_id):
    user = User.objects.get(user_id=user_id)
    user.present = not user.present
    user.save()
    return redirect('mastermind_dating:cohort_page', cohort_id=user.cohort.id)
