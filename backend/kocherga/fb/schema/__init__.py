from kocherga.graphql import g, helpers
from kocherga.graphql.basic_types import BasicResult
from kocherga.graphql.decorators import auth

from .. import marketing

c = helpers.Collection()


@c.class_field
class fbMarketingAudienceUploadRatioTickets(helpers.BaseField):
    @auth(permission="fb.marketing")
    def resolve(self, _, info, input):
        marketing.upload_ratio_tickets_audience()
        return {'ok': True}

    result = g.NN(BasicResult)


mutations = c.as_dict()
