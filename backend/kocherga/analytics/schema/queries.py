from datetime import datetime

from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import staffonly

from kocherga.cm.models import Customer

c = helpers.Collection()

# TODO - move to types
AnalyticsBovStat = g.ObjectType(
    'AnalyticsBovStat', g.fields({'date': str, 'count': int, 'total_income': int})
)


@c.class_field
class analyticsBovStats(helpers.BaseField):
    def resolve(self, _, info):
        cohort_dates = [
            '2019-01-07',
            '2019-02-07',
            '2019-03-10',
            '2019-04-07',
            '2019-06-30',
        ]

        BOV_stats = []
        for date_str in cohort_dates:
            customers = Customer.objects.from_date(
                datetime.strptime(date_str, '%Y-%m-%d').date()
            )
            total_income = sum(c.total_spent for c in customers)
            BOV_stats.append(
                {
                    'date': date_str,
                    'count': customers.count(),
                    'total_income': total_income,
                }
            )

        return BOV_stats

    permissions = [staffonly]
    result = g.NNList(AnalyticsBovStat)


queries = c.as_dict()
