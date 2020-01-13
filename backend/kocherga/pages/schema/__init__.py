from ariadne import ObjectType

PhotoRibbonBlock = ObjectType('PhotoRibbonBlock')


@PhotoRibbonBlock.field('value')
def resolve_PhotoRibbonBlock_value(obj, info, spec):
    return [
        image.get_rendition(spec)
        for image in obj.value
    ]


types = [PhotoRibbonBlock]
