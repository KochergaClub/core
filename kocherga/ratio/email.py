import logging
logger = logging.getLogger(__name__)

from django.template.loader import render_to_string

import markdown

import kocherga.mailchimp
from kocherga.email.tools import get_utmify, mjml2html
from .users import training_category_id


def training_recipients(training):
    return {
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
    }


def common_settings(title):
    return {
        'subject_line': title,
        'title': title,
        'from_name': 'Вячеслав Матюхин',
        'reply_to': 'workshop@kocherga-club.ru',
        'to_name': '*|FNAME|* *|LNAME|*',
        'folder_id': kocherga.mailchimp.folder_id_by_name('Воркшопы'),
    }


def create_pre_draft(training):
    title = 'Предрассылка к воркшопу по прикладной рациональности'
    logger.info('Creating campaign draft')
    campaign = kocherga.mailchimp.api_call('POST', 'campaigns', {
        'type': 'regular',
        'recipients': training_recipients(training),
        'settings': common_settings(title),
    })

    campaign_id = campaign['id']

    logger.info('Generating html content')

    main_html = markdown.markdown(render_to_string('ratio/email/pre.md', {
        'training': training,
    }))
    mjml = render_to_string('email/layout.mjml', {
        'title': title,
        'text': main_html,
        'utmify': get_utmify('pre-training', 'pre-training'),  # TODO - training id
    })

    html = mjml2html(mjml)

    logger.info('Filling campaign content')
    kocherga.mailchimp.api_call('PUT', f'campaigns/{campaign_id}/content', {
        'html': html,
    })


def create_post_draft(training):
    title = 'Пострассылка к воркшопу по рациональности'
    logger.info('Creating campaign draft')
    campaign = kocherga.mailchimp.api_call('POST', 'campaigns', {
        'type': 'regular',
        'recipients': training_recipients(training),
        'settings': common_settings(title),
    })

    campaign_id = campaign['id']

    logger.info('Generating html content')

    main_html = markdown.markdown(render_to_string('ratio/email/post.md', {
        'training': training,
    }))
    mjml = render_to_string('email/layout.mjml', {
        'title': title,
        'tiny_header': 'Материалы к воркшопу по рациональности',
        'text': main_html,
        'utmify': get_utmify('post-training', 'post-training'),  # TODO - training id
    })
    html = mjml2html(mjml)

    logger.info('Filling campaign content')
    kocherga.mailchimp.api_call('PUT', f'campaigns/{campaign_id}/content', {
        'html': html,
    })
