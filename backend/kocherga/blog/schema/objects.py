from ariadne import ObjectType


def create_BlogPostAuthor():
    BlogPostAuthor = ObjectType('BlogPostAuthor')

    @BlogPostAuthor.field('image')
    def resolve_image(obj, info, spec):
        return obj.get_rendition(spec)

    return BlogPostAuthor


types = [create_BlogPostAuthor()]
