from rest_framework import viewsets, permissions
from . import models, serializers


class EntryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = serializers.EntrySerializer

    def get_queryset(self):
        qs = models.Entry.objects.all()
        page_id = self.request.query_params.get('page_id')
        if page_id:
            qs = qs.filter(page__pk=page_id)

        return qs
