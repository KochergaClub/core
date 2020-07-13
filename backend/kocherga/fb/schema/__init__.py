from kocherga.graphql import g, helpers, permissions
from kocherga.graphql.basic_types import BasicResult

from .. import marketing

c = helpers.Collection()


@c.class_field
class fbMarketingAudienceUploadRatioTickets(helpers.BaseField):
    permissions = [permissions.user_perm('fb.marketing')]
    result = g.NN(BasicResult)

    def resolve(self, _, info, input):
        marketing.upload_ratio_tickets_audience()


mutations = c.as_dict()
