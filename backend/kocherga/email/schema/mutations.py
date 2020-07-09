from kocherga.graphql import g, helpers
from kocherga.graphql.decorators import staffonly, auth

from .. import models

c = helpers.Collection()


# emailSubscribeChannelDelete(slug: String!): Boolean @staffonly
@c.field
def emailSubscribeChannelDelete(_):
    @staffonly
    def resolve(_, info, slug):
        models.SubscribeChannel.objects.get(slug=slug).delete()
        return True

    return g.Field(g.Boolean, args=g.arguments({'slug': str}), resolve=resolve)


# emailSubscribeChannelCreate(
#   params: EmailSubscribeChannelCreateInput!
# ): Boolean @staffonly
@c.field
def emailSubscribeChannelCreate(_):
    @staffonly
    def resolve(_, info, params):
        slug = params['slug']
        interest_ids = params['interest_ids']
        interests = models.MailchimpInterest.objects.filter(pk__in=interest_ids).all()
        instance = models.SubscribeChannel.objects.create(slug=slug)
        instance.interests.set(interests)
        return True

    # input EmailSubscribeChannelCreateInput {
    #   slug: String!
    #   interest_ids: [ID!]!
    # }
    Input = g.InputObjectType(
        'EmailSubscribeChannelCreateInput',
        g.input_fields({'slug': str, 'interest_ids': g.NNList(g.ID)}),
    )

    # TODO - rename params -> input
    return g.Field(
        g.Boolean, args=g.arguments({'params': g.NN(Input)}), resolve=resolve
    )


# emailSubscribeChannelAddEmail(slug: String!, email: String!): Boolean
#   @staffonly
@c.field
def emailSubscribeChannelAddEmail(_):
    @staffonly
    def resolve(_, info, slug, email):
        channel = models.SubscribeChannel.objects.get(slug=slug)
        channel.subscribe_email(email)
        return True

    return g.Field(
        g.Boolean, args=g.arguments({'slug': str, 'email': str}), resolve=resolve
    )


def member_from_info(info):
    return models.MailchimpMember.get_from_mailchimp(info.context.user.email)


# myEmailResubscribe: Boolean @auth(authenticated: true)
@c.field
def myEmailResubscribe(_):
    @auth(authenticated=True)
    def resolve(_, info):
        member_from_info(info).set_status('pending', check_old_status='unsubscribed')
        return True

    return g.Field(g.Boolean, resolve=resolve)


# myEmailUnsubscribe: Boolean @auth(authenticated: true)
@c.field
def myEmailUnsubscribe(_):
    @auth(authenticated=True)
    def resolve(_, info):
        member_from_info(info).set_status('unsubscribed', check_old_status='subscribed')
        return True

    return g.Field(g.Boolean, resolve=resolve)


# myEmailSubscribeToInterest(interest_id: ID!): Boolean @auth(authenticated: true)
@c.field
def myEmailSubscribeToInterest(_):
    @auth(authenticated=True)
    def resolve(_, info, interest_id):
        member_from_info(info).subscribe_to_interest(interest_id)
        return True

    return g.Field(g.Boolean, args=g.arguments({'interest_id': 'ID!'}), resolve=resolve)


# myEmailUnsubscribeFromInterest(interest_id: ID!): Boolean @auth(authenticated: true)
@c.class_field
class myEmailUnsubscribeFromInterest(helpers.BaseField):
    @auth(authenticated=True)
    def resolve(self, _, info, interest_id):
        member_from_info(info).unsubscribe_from_interest(interest_id)
        return True

    args = g.arguments({'interest_id': 'ID!'})
    result = g.Boolean


mutations = c.as_dict()
