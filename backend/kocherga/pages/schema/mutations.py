import logging

logger = logging.getLogger(__name__)

import json

from kocherga.graphql import helpers
import kocherga.wagtail.schema.types
import kocherga.wagtail.utils

from .. import models

c = helpers.Collection()


@c.class_field
class wagtailEditPageBodyBlocks(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        page_id = input['page_id']
        qs = kocherga.wagtail.utils.get_page_queryset_for_request(info.context)
        page = qs.get(pk=page_id)

        # TODO - move to permission checker
        if not page.permissions_for_user(info.context.user).can_edit():
            raise Exception("Permission denied")

        page = page.specific

        assert any(
            [isinstance(page, m) for m in (models.FreeFormPage, models.FrontPage)]
        )

        # FIXME - validate? wagtail mostly validates blocks data but sometimes fails to do it properly
        stream_block = page._meta.get_field('body').stream_block
        serialized_value = json.loads(input['blocksJson'])
        page.body = stream_block.clean(stream_block.to_python(serialized_value))

        # TODO - pass user
        # TODO - consider `publish` flag
        page.save_revision()

        return {
            'page': page,
        }

    permissions = []
    input = {
        'page_id': 'ID!',
        'publish': bool,
        # Later we might implement a fully-typed solution, but we'll need to transform all blocks into
        # input types for that.
        'blocksJson': str,
    }
    result = {
        'page': kocherga.wagtail.schema.types.WagtailPage,
    }


mutations = c.as_dict()
