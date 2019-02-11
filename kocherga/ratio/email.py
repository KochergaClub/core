import logging
logger = logging.getLogger(__name__)

from django.template.loader import render_to_string

import markdown

import kocherga.mailchimp
import kocherga.email.mjml
from .users import training_category_id

post_email_str = """<mjml>
  <mj-head>
    <mj-title>Пострассылка к воркшопу по рациональности</mj-title>
    <mj-font name="Open Sans" href="https://fonts.googleapis.com/css?family=Open+Sans"></mj-font>
    <mj-attributes>
      <mj-all font-family="Open Sans, sans-serif"></mj-all>
      <mj-text font-weight="300" font-size="16px" color="#616161" line-height="24px"></mj-text>
      <mj-section padding="0"></mj-section>
    </mj-attributes>
    <mj-style inline="inline">
      a {
        color: #3498DB;
        text-decoration: none;
      }
    </mj-style>
  </mj-head>
  <mj-body>
    <mj-section padding="20px 0">
      <mj-column width="60%">
        <mj-text font-size="10px">Материалы к воркшопу по рациональности</mj-text>
      </mj-column>
      <mj-column width="40%">
        <mj-text font-size="10px" align="right"><a href="*|ARCHIVE|*">Открыть это письмо в браузере</a></mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column width="100%">
        <mj-text>
          {{ text }}
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column width="100%">
        <mj-divider border-width="1px" border-color="#E0E0E0"></mj-divider>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column width="75%">
        <mj-text>
          <a href="{{ "https://kocherga-club.ru" | utmify | e }}&utm_content=footer">Клуб Кочерга</a>
        </mj-text>
      </mj-column>
      <mj-column width="25%">
        <mj-table>
          <tr style="list-style: none;line-height:1">
            <td> <a href="https://vk.com/kocherga_club">
                  <img width="25" src="https://cdn-images.mailchimp.com/icons/social-block-v2/color-vk-48.png" />
                </a> </td>
            <td> <a href="https://facebook.com/kocherga.club">
                  <img width="25" src="https://cdn-images.mailchimp.com/icons/social-block-v2/color-facebook-48.png" />
                </a> </td>
            <td> <a href="https://www.youtube.com/c/КочергаКлуб">
                  <img width="25" src="https://cdn-images.mailchimp.com/icons/social-block-v2/color-youtube-48.png" />
                </a> </td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>"""

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
    html = kocherga.email.mjml.generate_html(
        post_email_str, {
            'text': main_html,
        },
        campaign='post-training', # TODO - training id
        source='post-training',
    )
    logger.info('Filling campaign content')
    kocherga.mailchimp.api_call('PUT', f'campaigns/{campaign_id}/content', {
        'html': html,
    })
