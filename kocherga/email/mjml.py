import logging
logger = logging.getLogger(__name__)

import jinja2

import io
import subprocess
import tempfile
from pathlib import Path

def get_utmify(campaign, source):
    def utmify(value):
        if 'vk.com' in value or 'facebook.com' in value:
            return value # utmifying social links is not necessary

        value += '&' if '?' in value else '?'
        return value + f'utm_campaign={campaign}&utm_medium=email&utm_source={source}'
    return utmify

def generate_html(template_str, props, campaign, source):
    env = jinja2.Environment()
    env.filters['utmify'] = get_utmify(campaign, source)

    template = env.from_string(template_str)

    mjml = template.render(
        **props
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

    return html
