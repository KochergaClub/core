from ariadne import MutationType

Mutation = MutationType()


@Mutation.field('myPrivacyModeSet')
def myPrivacyModeSet(_, info, mode: str):
    if not hasattr(info.context.user, 'customer'):
        raise Exception("User doesn't have a customer profile")

    customer = info.context.user.customer

    customer.privacy_mode = mode
    customer.full_clean()
    customer.save()
    return True
