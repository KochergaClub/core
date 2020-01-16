from ariadne import ObjectType

ImageTemplate = ObjectType('ImageTemplate')


@ImageTemplate.field('sizes')
def resolve_sizes(obj, info):
    (width, height) = obj.sizes
    return {
        "width": width,
        "height": height,
    }


types = [ImageTemplate]
