from django.views import View
from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.auth.mixins import UserPassesTestMixin

from kocherga.django.react import react_render

from .models import Training
from . import serializers
from .users import training2mailchimp
from .email import create_post_draft, create_pre_draft

from urllib.parse import urlencode


class RatioManagerMixin(UserPassesTestMixin):
    def test_func(self):
        return self.request.user.has_perm('ratio.manage')


class MainView(RatioManagerMixin, View):
    def get(self, request):
        trainings = Training.objects.all()
        return react_render(request, 'ratio/index.tsx', {
            'trainings': serializers.TrainingSerializer(trainings, many=True).data,
        })


class TrainingView(RatioManagerMixin, View):
    def get(self, request, name):
        training = Training.objects.get(name=name)

        training_admin_url = reverse('admin:ratio_training_change', args=(training.name,))

        tickets_admin_url = reverse('admin:ratio_ticket_changelist') \
            + '?' \
            + urlencode({'training__name__exact': training.name})

        return react_render(request, 'ratio/training.tsx', {
            'training': serializers.TrainingSerializer(training).data,
            'tickets': serializers.TicketSerializer(training.tickets, many=True).data,
            'urls': {
                'training_admin': training_admin_url,
                'tickets_admin': tickets_admin_url,
                'actions': {
                    action: reverse('ratio:training_action', kwargs={'name': training.name, 'action': action})
                    for action in ('to_mailchimp', 'pre_email', 'post_email', 'pay_salaries')
                },
                'schedule': reverse('ratio:schedule', kwargs={'name': training.name}),
            },
        })


class TrainingActionView(RatioManagerMixin, View):
    def post(self, request, name, action):
        training = Training.objects.get(name=name)

        if action == 'to_mailchimp':
            training2mailchimp(training)
        elif action == 'pre_email':
            create_pre_draft(training)
        elif action == 'post_email':
            create_post_draft(training)
        elif action == 'pay_salaries':
            training.pay_salaries()
        else:
            raise Exception(f"Unknown action {action}")

        return redirect('ratio:training', name=name)


class ScheduleView(RatioManagerMixin, View):
    def get(self, request, name):
        training = Training.objects.get(name=name)
        return react_render(request, 'ratio/schedule.tsx', {
            'name': training.name,
            'long_name': training.long_name,
            'urls': {
                'training': training.get_absolute_url(),
                'actions': {
                    'change': reverse('admin:ratio_training_change', args=[name]),
                }
            },
            'schedule': serializers.ActivitySerializer(training.schedule, many=True).data,
        })
