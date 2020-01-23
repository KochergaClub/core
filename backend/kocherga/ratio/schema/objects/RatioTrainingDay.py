from ariadne import ObjectType

RatioTrainingDay = ObjectType('RatioTrainingDay')


@RatioTrainingDay.field('activities')
def resolve_activities(obj, info):
    return obj.schedule.all()
