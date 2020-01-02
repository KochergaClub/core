from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes

from . import tools


# still used at kocherga-club.ru/now
@api_view()
@permission_classes((AllowAny,))
def people_now_view(request):
    return Response(tools.now_stats_cached())
