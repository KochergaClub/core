from kocherga.graphql import g


# WagtailPage
def resolve_WagtailPage_type(page, *_):
    page_class = page.specific_class
    if not hasattr(page_class, 'graphql_type'):
        raise Exception("Page model is missing `graphql_type` property")
    return page_class.graphql_type


# WagtailPageMeta
WagtailPageMeta = g.ObjectType(
    'WagtailPageMeta',
    g.fields(
        {
            'slug': str,
            'html_url': str,
            'permissions': g.NN(g.ObjectType(
                'WagtailPagePermissions', g.fields({'can_edit': bool})
            )),
        }
    ),
)


def resolve_WagtailPage_meta(page, info):
    return {
        'slug': page.slug,
        'html_url': page.url,
        'permissions': {
            'can_edit': page.permissions_for_user(info.context.user).can_edit(),
        },
    }


WagtailPage = g.InterfaceType(
    'WagtailPage',
    g.fields(
        {
            'id': 'ID!',
            'title': str,
            'meta': g.Field(g.NN(WagtailPageMeta), resolve=resolve_WagtailPage_meta),
        }
    ),
    resolve_type=resolve_WagtailPage_type,
)


# WagtailImage
WagtailImage = g.ObjectType(
    'WagtailImage', g.fields({'id': 'ID!', 'url': str, 'width': int, 'height': int})
)

# WagtailImageRendition
WagtailImageRendition = g.ObjectType(
    'WagtailImageRendition',
    g.fields(
        {
            'id': 'ID!',
            'url': str,
            'width': int,
            'height': int,
            'original_image': g.Field(
                g.NN(WagtailImage),
                # TODO - require permissions?
                resolve=lambda r, info: r.image,
            ),
        }
    ),
)


# WagtailBlock
def resolve_WagtailBlock_type(obj, *_):
    # Naming type by convention.
    # Example: type='grey' -> GreyWagtailBlock
    camel_name = ''.join([part.capitalize() for part in obj.block.name.split('_')])
    return camel_name + 'Block'


WagtailBlock = g.InterfaceType(
    'WagtailBlock',
    g.fields(
        {
            'id': 'ID!',
            # Note that there's no `type` field;
            # there's no point in duplicating it since it can be restored from GraphQL's __typename.
        }
    ),
    resolve_type=resolve_WagtailBlock_type,
)


# WagtailGeo
WagtailGeo = g.ObjectType('WagtailGeo', g.fields({'lat': str, 'lng': str}))
