from kocherga.mailchimp import api_call, MAIN_LIST_ID, get_interests

from kocherga.importer.base import FullImporter

from .models import MailchimpCategory, MailchimpInterest


def import_category(category_data):
    print(category_data)
    (category, _) = MailchimpCategory.objects.update_or_create(
        category_id=category_data['id'],
        defaults={
            'title': category_data['title'],
            'type': category_data['type'],
        }
    )

    interests = get_interests(category.category_id)
    for interest_data in interests:
        # TODO - remove non-existent interests
        (interest, _) = MailchimpInterest.objects.update_or_create(
            interest_id=interest_data['id'],
            defaults={
                'name': interest_data['name'],
                'subscriber_count': interest_data['subscriber_count'],
                'category': category,
            }
        )


class Importer(FullImporter):
    def do_full_import(self):
        response = api_call('GET', f'lists/{MAIN_LIST_ID}/interest-categories')
        for category_data in response['categories']:
            import_category(category_data)
            # TODO - remove non-existent categories
