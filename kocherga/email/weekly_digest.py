#!/usr/bin/env python3

import jinja2

template_str = """<mjml>
  <mj-head>
    <mj-title>Расписание мероприятий Кочерги на {{ title_dates | e }}</mj-title>
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
        <mj-text font-size="10px">Мероприятия Кочерги на ближайшую неделю</mj-text>
      </mj-column>
      <mj-column width="40%">
        <mj-text font-size="10px" align="right"><a href="*|ARCHIVE|*">Открыть это письмо в браузере</a></mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column width="100%">
        <mj-image href="https://kocherga-club.ru?utm_campaign=weekly-digest&utm_medium=email&utm_source=kocherga-newsletter&utm_content=image" src="{{ image_url | e }}"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section padding-top="30px">
      <mj-column width="100%">
        <mj-text>
          {{ text | e }}
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column width="100%">
        <mj-divider border-width="1px" border-color="#E0E0E0"></mj-divider>
      </mj-column>
    </mj-section>
{% for group in events_by_date %}
    <mj-section>
      <mj-column width="100%">
        <mj-text>
          <h2 style="font-weight: normal; margin-top: 5px">{{ date2day(group['date']) | e }}</h2>
          {% for event in group['events'] %}
            <h3 style="font-weight: bold; margin-top: 0; margin-bottom: 0">
                {{ event.start_dt.strftime("%H:%M") | e }}. {{ event.title | e }}
            </h3>
            <p style="font-size: 14px">{{ event.summary | e }}
            </p>
            <p><i>Подробнее:
              {% if event.posted_vk %}<a href="{{ event.posted_vk | utmify | e }}">вконтакте</a>{% endif -%}
              {% if event.posted_fb %}, <a href="{{ event.posted_fb | utmify | e }}">facebook</a>{% endif -%}
              {% if event.posted_timepad %}, <a href="{{ event.posted_timepad | utmify | e }}">timepad</a>{% endif -%}
            </i></p>
          {% endfor %}
        </mj-text>
      </mj-column>
    </mj-section>
{% endfor %}
    <mj-section>
      <mj-column width="100%">
        <mj-divider border-width="1px" border-color="#E0E0E0"></mj-divider>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column width="75%">
        <mj-text>
          <a href="https://kocherga-club.ru?utm_campaign=weekly-digest&utm_medium=email&utm_source=kocherga-newsletter&utm_content=footer">Клуб Кочерга</a>
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

import io
import subprocess
import tempfile
import base64
from pathlib import Path

import kocherga.mailchimp
import kocherga.images

from kocherga.events.event import Event
from kocherga.db import Session
import kocherga.datetime
from datetime import timedelta, datetime

def get_week_boundaries():
    dt = datetime.today()
    if dt.weekday() < 2:
        dt = dt - timedelta(days=dt.weekday())
    else:
        dt = dt + timedelta(days=7 - dt.weekday())

    dt = dt.replace(hour=0, minute=0, second=0, microsecond=0)

    end_dt = dt + timedelta(days=6)

    return (dt, end_dt)

def utmify(value):
    if 'vk.com' in value or 'facebook.com' in value:
        return value # utmifying social links is not necessary

    value += '&' if '?' in value else '?'
    return value + 'utm_campaign=weekly-digest&utm_medium=email&utm_source=kocherga-newsletter'

def generate_content(image_url):
    env = jinja2.Environment()
    env.filters['utmify'] = utmify
    template = env.from_string(template_str)

    (dt, end_dt) = get_week_boundaries()

    query = (
        Session()
        .query(Event)
        .filter(Event.start_ts > dt.timestamp())
        .filter(Event.start_ts < (dt + timedelta(weeks=1)).timestamp())
        .filter(Event.posted_vk != None)
        .filter(Event.posted_vk != "")
    )
    events = query.order_by(Event.start_ts).all()

    date2events = {}
    for event in events:
        d = event.start_dt.strftime('%Y-%m-%d')
        if d not in date2events:
            date2events[d] = []
        date2events[d].append(event)

    events_by_date = [
        {
            "date": d,
            "events": date2events[d],
        }
        for d in sorted(date2events.keys())
    ]

    start_month = kocherga.datetime.inflected_month(dt)
    end_month = kocherga.datetime.inflected_month(end_dt)

    title_dates = ''
    if start_month == end_month:
        title_dates = f'{dt.day} – {end_dt.day} {start_month}'
    else:
        title_dates = f'{dt.day} {start_month} – {end_dt.day} {end_month}'

    def date2day(d):
        dt = datetime.strptime(d, '%Y-%m-%d')
        weekday = kocherga.datetime.weekday(dt).capitalize()
        month = kocherga.datetime.inflected_month(dt)
        return f"{weekday}, {dt.day} {month}"

    mjml = template.render(
        image_url=image_url,
        title_dates=title_dates,
        events_by_date=events_by_date,
        date2day=date2day,
    )

    mjml_in_fh = io.StringIO(mjml)
    fp = tempfile.TemporaryFile(mode='w+')
    fp.write(mjml)
    fp.seek(0)
    html_out_fh = io.StringIO()

    root_dir = Path(__file__).parent.parent.parent
    mjml = str(root_dir / 'node_modules' / '.bin' / 'mjml')
    with subprocess.Popen(
            [mjml, '/dev/stdin'],
            stdin=fp,
            stdout=subprocess.PIPE,
            encoding='utf-8',
        ) as proc:
        html = proc.stdout.read()

    return {
        'mjml': mjml,
        'title': f'Расписание мероприятий Кочерги на {title_dates}',
        'html': html,
    }

# TODO - move to config or detect by name
MAIN_LIST_ID = "d73cd4de36"
IMAGE_FOLDER_ID = 19921

def upload_main_image():
    (dt, _) = get_week_boundaries()

    image_content = kocherga.images.image_storage.create_mailchimp_image(dt)

    result = kocherga.mailchimp.api_call(
        'POST',
        f'file-manager/files',
        {
            'folder_id': IMAGE_FOLDER_ID,
            'name': f"weekly-image-{dt.strftime('%Y-%m-%d')}.png",
            'file_data': base64.encodebytes(image_content).decode('utf-8'),
        }
    )

    return result['full_size_url']

def create_draft():
    image_url = upload_main_image()
    content = generate_content(image_url)

    campaign = kocherga.mailchimp.api_call('POST', 'campaigns', {
        'type': 'regular',
        'recipients': {
            'list_id': MAIN_LIST_ID,
        },
        'settings': {
            'subject_line': content['title'],
            'title': content['title'],
            'from_name': 'Антикафе Кочерга',
            'reply_to': 'info@kocherga-club.ru',
            'to_name': '*|FNAME|*',
        }
    })

    campaign_id = campaign['id']

    kocherga.mailchimp.api_call('PUT', f'campaigns/{campaign_id}/content', {
        'html': content['html'],
    })
