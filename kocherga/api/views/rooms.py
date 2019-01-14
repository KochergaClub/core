from rest_framework.views import APIView
from rest_framework.response import Response

import kocherga.room

class RoomsView(APIView):
    def get(self, request):
        return Response([
            kocherga.room.details(room)
            for room in kocherga.room.all_rooms
        ])
