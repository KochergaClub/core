from collections import defaultdict

from django.conf import settings

from . import api
import kocherga.ratio.models

MARKETING_TOKEN = settings.KOCHERGA_FB_MARKETING['access_token']
MARKETING_ACCOUNT_ID = settings.KOCHERGA_FB_MARKETING['account_id']


def get_audiences():
    audiences = api.get(
        f'act_{MARKETING_ACCOUNT_ID}/customaudiences',
        fields=['id'],
        token=MARKETING_TOKEN,
    )
    return audiences['data']


def upload_ratio_tickets_audience():
    AUDIENCE_ID = settings.KOCHERGA_FB_MARKETING['audiences']['ratio_tickets']

    tickets = kocherga.ratio.models.Ticket.objects.all()

    email2tickets = defaultdict(list)
    for t in tickets:
        if not t.email:
            continue
        if not t.payment_amount:
            continue
        email2tickets[t.email].append(t)

    schema = ['EMAIL', 'FN', 'LN', 'LOOKALIKE_VALUE']
    data = []
    for email, email_tickets in email2tickets.items():
        data.append([
            email,
            email_tickets[0].first_name,
            email_tickets[0].last_name,
            sum(t.payment_amount for t in email_tickets),
        ])

    api.post(
        f'{AUDIENCE_ID}/users',
        data={
            'payload': {
                'schema': schema,
                'data': data,
            }
        },
        token=MARKETING_TOKEN,
    )
