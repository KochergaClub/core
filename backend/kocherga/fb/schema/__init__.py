from ariadne import MutationType

from .. import marketing

Mutation = MutationType()


@Mutation.field('fbMarketingAudienceUploadRatioTickets')
def fbMarketingAudienceUploadRatioTickets(_, info):
    marketing.upload_ratio_tickets_audience()
    return {
        'ok': True
    }


types = [Mutation]
