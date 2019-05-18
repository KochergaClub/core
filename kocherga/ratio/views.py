from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Training
from . import serializers
from .users import training2mailchimp
from . import email


class IsRatioManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('ratio.manage')


class TrainingViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsRatioManager,)
    queryset = Training.objects.all()
    serializer_class = serializers.TrainingSerializer
    lookup_field = 'name'

    @action(detail=True, methods=['post'])
    def to_mailchimp(self, request, name=None):
        training2mailchimp(self.get_object())
        return Response('ok')

    @action(detail=True, methods=['post'])
    def email(self, request, name=None):
        title = request.data['title']
        content = request.data['content']
        result = email.create_any_draft(self.get_object(), title, content)
        return Response({
            'draft_link': result['draft_link'],
        })

    @action(detail=True)
    def email_prototype_pre(self, request, name=None):
        return Response({
            'content': email.get_pre_content(self.get_object()),
        })

    @action(detail=True)
    def email_prototype_post(self, request, name=None):
        return Response({
            'content': email.get_post_content(self.get_object()),
        })

    @action(detail=True, methods=['post'])
    def pay_salaries(self, request, name=None):
        self.get_object().pay_salaries()
        return Response('ok')

    @action(detail=True)
    def tickets(self, request, name=None):
        training_tickets = self.get_object().tickets
        return Response(
            serializers.TicketSerializer(training_tickets, many=True).data,
        )

    @action(detail=True)
    def schedule(self, request, name=None):
        training = self.get_object()
        return Response(
            serializers.ActivitySerializer(training.schedule, many=True).data,
        )
