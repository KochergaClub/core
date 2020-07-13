from kocherga.graphql import g, helpers, permissions

c = helpers.Collection()


@c.field
def myPrivacyModeSet(helper):
    @permissions.check_permissions([permissions.authenticated])
    def resolve(_, info, mode: str):
        if not hasattr(info.context.user, 'customer'):
            raise Exception("User doesn't have a customer profile")

        customer = info.context.user.customer

        customer.privacy_mode = mode
        customer.full_clean()
        customer.save()
        return True

    return g.Field(g.Boolean, args=g.arguments({'mode': str}), resolve=resolve)


mutations = c.as_dict()
