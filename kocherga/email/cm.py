from kocherga.db import Session
from kocherga.cm import Customer

from .lists import populate_main_list
from .lists import User as MailUser

def import_customers():
    customers = Session().query(Customer).all()

    populate_main_list([
        MailUser(
            email=c.email,
            first_name=c.first_name,
            last_name=c.last_name,
            card_id=c.card_id,
        )
        for c in customers
        if c.email
    ])
