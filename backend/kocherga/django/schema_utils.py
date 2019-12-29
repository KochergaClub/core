import graphene


def require_permission(permission_name):
    def decorator(func):
        def wrapper(*args, **kwargs):
            info = args[1]
            if not info.context.user.has_perm(permission_name):
                raise Exception("Forbidden")
            return func(*args, **kwargs)
        return wrapper

    return decorator


def require_staff(func):
    def wrapper(*args, **kwargs):
        info = args[1]
        if not info.context.user.is_staff:
            raise Exception("Forbidden")
        return func(*args, **kwargs)
    return wrapper


class Ok(graphene.ObjectType):
    ok = graphene.Boolean()


# https://github.com/graphql-python/graphene-django/issues/566#issuecomment-451542639
class NonNullConnection(graphene.relay.Connection):

    class Meta:
        abstract = True

    @classmethod
    def __init_subclass_with_meta__(cls, node=None, name=None, **options):
        super().__init_subclass_with_meta__(node=node, name=name, **options)

        # Override the original EdgeBase type to make to `node` field required.
        class EdgeBase:
            node = graphene.Field(
                cls._meta.node, description='The item at the end of the edge',
                required=True)
            cursor = graphene.String(
                required=True, description='A cursor for use in pagination')

        # Create the edge type using the new EdgeBase.
        edge_name = cls.Edge._meta.name
        edge_bases = (EdgeBase, graphene.ObjectType,)
        edge = type(edge_name, edge_bases, {})
        cls.Edge = edge

        # Override the `edges` field to make it non-null list
        # of non-null edges.
        cls._meta.fields['edges'] = graphene.Field(graphene.NonNull(graphene.List(graphene.NonNull(cls.Edge))))


def NNList(field):
    return graphene.NonNull(graphene.List(graphene.NonNull(field)))
