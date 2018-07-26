import logging
logger = logging.getLogger(__name__)

from quart import Blueprint, request, make_response

import kocherga.config
import kocherga.templater


bp = Blueprint("templater", __name__)


def get_args(args, form):
    result = {}

    for k, v in args.items():
        result[k] = v
    result.update(form)

    result["url_root"] = kocherga.config.config()['web_root']

    return result


@bp.route("/templater/html/<name>") # TODO - rename to /templater/<name>/html
async def r_html(name):
    template = kocherga.templater.Template(name)
    args = get_args(request.args, await request.form)
    return template.generate_html(args)


@bp.route("/templater/png/<name>") # TODO - rename to /templater/<name>/html
async def r_png(name):
    template = kocherga.templater.Template(name)
    args = get_args(request.args, await request.form)
    image_bytes = await template.generate_png(args)

    response = await make_response(image_bytes)
    response.headers["Content-Type"] = "image/png"
    return response


@bp.route("/templater/<name>/schema")
async def r_schema(name):
    template = kocherga.templater.Template(name)
    return jsonify(template.schema)
