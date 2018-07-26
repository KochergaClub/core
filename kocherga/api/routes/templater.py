import logging
logger = logging.getLogger(__name__)

from quart import Blueprint, request, make_response

import kocherga.config
import kocherga.templater
from kocherga.api.auth import auth


bp = Blueprint("templater", __name__)


def get_args(args, form):
    result = {}

    for k, v in args.items():
        result[k] = v
    result.update(form)

    result["url_root"] = kocherga.config.config()['web_root']

    return result


@bp.route("/templater/html/<name>") # deprecated
async def r_html_old(name):
    return redirect(f"/templater/{name}/html", code=301)


@bp.route("/templater/png/<name>") # deprecated
async def r_png_old(name):
    return redirect(f"/templater/{name}/png", code=301)


@bp.route("/templater/<name>/html")
async def r_html(name):
    template = kocherga.templater.Template.by_name(name)
    args = get_args(request.args, await request.form)
    return template.generate_html(args)


@bp.route("/templater/<image>/png")
async def r_png(name):
    template = kocherga.templater.Template.by_name(name)
    args = get_args(request.args, await request.form)
    image_bytes = await template.generate_png(args)

    response = await make_response(image_bytes)
    response.headers["Content-Type"] = "image/png"
    return response


@bp.route("/templater/<name>/schema")
@auth("kocherga")
async def r_schema(name):
    template = kocherga.templater.Template.by_name(name)
    return jsonify(template.schema)

@bp.route("/templater")
@auth("kocherga")
async def r_list():
    names = kocherga.templater.list_templates()
    return jsonify([
        {
            "name": name,
            "schema": Template.by_name(name).schema,
        }
        for name in names
    ])
