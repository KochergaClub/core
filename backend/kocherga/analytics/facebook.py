import csv
from datetime import datetime, timedelta

from kocherga.dateutils import TZ
import kocherga.cm.models
import kocherga.ratio.models


def export_offline_conversions(filename, min_order_id):
    orders = kocherga.cm.models.Order.objects.all()
    customers = kocherga.cm.models.Customer.objects.all()
    card_id2customer = {c.card_id: c for c in customers}

    with open(filename, 'w') as fh:
        w = csv.writer(fh)
        w.writerow(
            [
                'email',
                'fn',
                'ln',
                'country',
                'event_name',
                'event_time',
                'order_id',
                'value',
                'currency',
            ]
        )
        for order in orders:
            if order.order_id < min_order_id:
                continue
            c = card_id2customer.get(order.card_id)
            if not c:
                continue
            if not c.email:
                continue
            if (c.first_name or '') not in order.client_name or (
                c.last_name or ''
            ) not in order.client_name:
                continue  # fix archived clients issue
            if order.order_value == 0:
                continue
            if order.end_dt < datetime.now(tz=TZ) - timedelta(days=60):
                continue
            w.writerow(
                [
                    c.email,
                    c.first_name,
                    c.last_name,
                    'RU',
                    'Purchase',
                    order.end_dt.isoformat(),
                    order.order_id,
                    order.order_value,
                    'RUB',
                ]
            )


def export_cm_audience(filename):
    customers = kocherga.cm.models.Customer.objects.all()

    with open(filename, 'w') as fh:
        w = csv.writer(fh)
        w.writerow(['email', 'fn', 'ln', 'country', 'value', 'currency'])
        for c in customers:
            if not c.email:
                continue
            w.writerow(
                [
                    c.email,
                    c.first_name,
                    c.last_name,
                    'RU',
                    c.total_spent,
                    'RUB',
                ]  # TODO - expected LTV estimation
            )
