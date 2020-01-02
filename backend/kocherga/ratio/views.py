from rest_framework import viewsets, permissions, mixins
from rest_framework.decorators import action
from rest_framework.response import Response

from kocherga.django.pagination import CommonPagination

from . import serializers, models, email
from .users import training2mailchimp


class IsRatioManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('ratio.manage')


class TrainingViewSet(viewsets.ReadOnlyModelViewSet, mixins.CreateModelMixin):
    permission_classes = (IsRatioManager,)
    queryset = models.Training.objects.all()
    serializer_class = serializers.TrainingSerializer
    pagination_class = CommonPagination
    lookup_field = 'slug'

    @action(detail=True, methods=['post'])
    def to_mailchimp(self, request, slug=None):
        training2mailchimp(self.get_object())
        return Response('ok')

    @action(detail=True, methods=['post'])
    def email(self, request, slug=None):
        title = request.data['title']
        content = request.data['content']
        result = email.create_any_draft(self.get_object(), title, content)
        return Response({
            'draft_link': result['draft_link'],
        })

    @action(detail=True)
    def email_prototype_pre(self, request, slug=None):
        return Response({
            'content': email.get_pre_content(self.get_object()),
        })

    @action(detail=True)
    def email_prototype_post(self, request, slug=None):
        return Response({
            'content': email.get_post_content(self.get_object()),
        })
