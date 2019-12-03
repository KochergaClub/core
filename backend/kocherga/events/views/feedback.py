from rest_framework import viewsets, permissions

from .. import serializers, models


class FeedbackViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAdminUser,)
    queryset = models.Feedback.objects.all()
    serializer_class = serializers.FeedbackSerializer
