from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from kocherga.cm.models import Customer

from datetime import datetime


class BovStatsView(APIView):
    permission_classes = (IsAdminUser,)

    def get(self, request):
        cohort_dates = [
            '2019-01-07',
            '2019-02-07',
            '2019-03-10',
            '2019-04-07',
            '2019-06-30',
        ]

        BOV_stats = []
        for date_str in cohort_dates:
            customers = Customer.objects.from_date(datetime.strptime(date_str, '%Y-%m-%d').date())
            total_income = sum(c.total_spent for c in customers)
            BOV_stats.append({
                'date': date_str,
                'count': customers.count(),
                'total_income': total_income,
            })

        return Response(BOV_stats)
