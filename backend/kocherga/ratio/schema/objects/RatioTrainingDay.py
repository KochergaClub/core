from ariadne import ObjectType

RatioTrainingDay = ObjectType('RatioTrainingDay')


@RatioTrainingDay.field('activities')
def resolve_tickets(obj, info):
    return obj.schedule.all()
