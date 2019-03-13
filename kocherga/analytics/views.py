from django.contrib.admin.views.decorators import staff_member_required

from kocherga.django.react import react_render

from kocherga.cm.models import Customer

from datetime import datetime


@staff_member_required
def index(request):
    cohort_dates = [
        '2019-01-07',
        '2019-02-07',
        '2019-03-10',
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

    return react_render(request, 'analytics/index.tsx', {
        'bov_stats': BOV_stats,
    })
