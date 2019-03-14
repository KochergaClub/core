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
        tickets_admin_url = reverse('admin:ratio_ticket_changelist') \
            + '?' \
            + urlencode({'training__name__exact': training.name})

        return react_render(request, 'ratio/training.tsx', {
            'training': serializers.TrainingSerializer(training).data,
            'tickets': serializers.TicketSerializer(training.tickets, many=True).data,
            'urls': {
                'tickets_admin': tickets_admin_url,
                'actions': {
                    'to_mailchimp': reverse('ratio:training_to_mailchimp', kwargs={'name': training.name}),
                    'pre_email': reverse('ratio:training_pre_email', kwargs={'name': training.name}),
                    'post_email': reverse('ratio:training_post_email', kwargs={'name': training.name}),
                },
                'schedule': reverse('ratio:schedule', kwargs={'name': training.name}),
            },
        })


class TrainingToMailchimpView(RatioManagerMixin, View):
    def post(self, request, name):
        training2mailchimp(Training.objects.get(name=name))
        return redirect('ratio:training', name=name)


class TrainingPreEmailView(RatioManagerMixin, View):
    def post(self, request, name):
        create_pre_draft(Training.objects.get(name=name))
        return redirect('ratio:training', name=name)


class TrainingPostEmailView(RatioManagerMixin, View):
    def post(self, request, name):
        create_post_draft(Training.objects.get(name=name))
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
