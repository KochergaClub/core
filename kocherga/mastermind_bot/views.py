from django.contrib.admin.views.decorators import staff_member_required

from kocherga.django.react import react_render

from .models import Cohort
from . import serializers

from datetime import datetime

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
