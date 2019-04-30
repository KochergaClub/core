from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAdminUser

from .models import Member
from .serializers import MemberSerializer


class MemberListView(ListAPIView):
    queryset = Member.objects.all()

    permission_classes = (IsAdminUser,)
    serializer_class = MemberSerializer
