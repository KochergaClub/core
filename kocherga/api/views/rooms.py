from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

import kocherga.room


class RoomsView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        return Response([
            kocherga.room.details(room)
            for room in kocherga.room.all_rooms
        ])
