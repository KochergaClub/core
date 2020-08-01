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
                    'value': [training.mailchimp_interest_id],
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


def create_any_draft(
    training, title, main_md, utm_campaign='email', utm_source='email'
):
    logger.info('Creating campaign draft')
    campaign = kocherga.mailchimp.api_call(
        'POST',
        'campaigns',
        {
            'type': 'regular',
            'recipients': training_recipients(training),
            'settings': common_settings(title),
        },
    )

    campaign_id = campaign['id']

    logger.info('Generating html content')

    main_html = markdown.markdown(main_md)

    mjml = render_to_string(
        'ratio/email/campaign.mjml',
        {
            'title': title,
            'text': main_html,
            'utmify': get_utmify(utm_campaign, utm_source),  # TODO - training id
        },
    )

    html = mjml2html(mjml)

    logger.info('Filling campaign content')
    kocherga.mailchimp.api_call(
        'PUT', f'campaigns/{campaign_id}/content', {'html': html}
    )

    return {
        'draft_link': kocherga.mailchimp.campaign_web_link(campaign['web_id']),
    }


def get_pre_content(training):
    return render_to_string('ratio/email/pre.md', {'training': training})


def get_post_content(training):
    return render_to_string('ratio/email/post.md', {'training': training})
