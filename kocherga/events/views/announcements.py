import logging
logger = logging.getLogger(__name__)

from django.http import FileResponse
from django.views.decorators.http import require_safe

from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser
from rest_framework import viewsets, generics

from kocherga.images import image_storage
from kocherga.events import models
from kocherga.events import serializers

import kocherga.events.models.announcement.timepad

from kocherga.api.common import ok


class AnnouncementViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsAdminUser,)
    lookup_field = 'event__pk'

    def get_object(self):
        event = generics.get_object_or_404(
            models.Event.objects.all(),
            pk=self.kwargs[self.lookup_field]
        )
        announcement = getattr(event, self.event_field)
        return announcement

    @action(detail=True, methods=['post'])
    def announce(self, request, **kwargs):
        announcement = self.get_object()
        announcement.announce()

        serializer = self.get_serializer(announcement)
        return Response(serializer.data)


class TimepadViewSet(AnnouncementViewSet):
    queryset = models.TimepadAnnouncement.objects.all()
    serializer_class = serializers.TimepadAnnouncementSerializer
    event_field = 'timepad_announcement'

    @action(detail=False)
    def categories(self, request):
        categories = kocherga.events.models.announcement.timepad.timepad_categories()
        return Response([
            {
                "id": c.id, "name": c.name, "code": c.code
            } for c in categories
        ])


class VkViewSet(AnnouncementViewSet):
    queryset = models.VkAnnouncement.objects.all()
    serializer_class = serializers.VkAnnouncementSerializer
    event_field = 'vk_announcement'

    @action(detail=False)
    def groups(self, request):
        all_groups = models.VkAnnouncement.objects.all_groups()
        return Response(all_groups)  # TODO - serializer

    @action(detail=False, methods=['post'])
    def update_wiki_schedule(self, request):
        models.VkAnnouncement.objects.update_wiki_schedule()
        return Response(ok)

    @action(detail=True, methods=['post'])
    def image(self, request, **kwargs):
        files = request.FILES
        if "file" not in files:
            raise Exception("Expected a file")
        f = files["file"]

        if f.name == "":
            raise Exception("No filename")

        self.get_object().add_image(f)
        return Response(ok)


class FbViewSet(AnnouncementViewSet):
    queryset = models.FbAnnouncement.objects.all()
    serializer_class = serializers.FbAnnouncementSerializer
    event_field = 'fb_announcement'

    @action(detail=False)
    def groups(self, request):
        all_groups = models.FbAnnouncement.objects.all_groups()
        return Response(all_groups)  # TODO - serializer

    @action(detail=True, methods=['post'])
    def add_to_main_page(self, request, **kwargs):
        announcement = self.get_object()
        announcement.add_to_main_page()
        return Response(ok)

    @action(detail=True, methods=['post'])
    def share_to_main_page(self, request, **kwargs):
        announcement = self.get_object()
        announcement.share_to_main_page()
        return Response(ok)


@require_safe
def r_last_screenshot(request):
    filename = image_storage.screenshot_file("error")
    return FileResponse(open(filename, 'rb'))
