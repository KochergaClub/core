import logging
logger = logging.getLogger(__name__)

from django.template.loader import render_to_string

import markdown

import kocherga.mailchimp
from kocherga.email.tools import get_utmify, mjml2html
from .users import training_category_id

def create_post_draft(training):
    logger.info('Creating campaign draft')
    campaign = kocherga.mailchimp.api_call('POST', 'campaigns', {
        'type': 'regular',
        'recipients': {
            'list_id': kocherga.mailchimp.MAIN_LIST_ID,
            'segment_opts': {
                'match': 'all',
                'conditions': [
                    {
                        'condition_type': 'Interests',
                        'op': 'interestcontains',
                        'field': f'interests-{training_category_id()}',
                        'value': [
                            training.mailchimp_interest_id,
                        ],
                    }
                ],
            },
        },
        'settings': {
            'subject_line': 'Пострассылка к воркшопу по рациональности',
            'title': 'Пострассылка к воркшопу по рациональности',
            'from_name': 'Вячеслав Матюхин',
            'reply_to': 'workshop@kocherga-club.ru',
            'to_name': '*|FNAME|* *|LNAME|*',
            'folder_id': kocherga.mailchimp.folder_id_by_name('Воркшопы'),
        }
    })

    campaign_id = campaign['id']

    logger.info('Generating html content')

    main_html = markdown.markdown(render_to_string('ratio/email/post.md', {
        'training': training,
    }))
    mjml = render_to_string('email/layout.mjml', {
        'title': 'Пострассылка к воркшопу по рациональности',
        'tiny_header': 'Материалы к воркшопу по рациональности',
        'text': main_html,
        'utmify': get_utmify('post-training', 'post-training'), # TODO - training id
    })

    logger.info('Filling campaign content')
    kocherga.mailchimp.api_call('PUT', f'campaigns/{campaign_id}/content', {
        'html': html,
    })
