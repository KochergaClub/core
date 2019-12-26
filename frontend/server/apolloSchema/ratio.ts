import { Resolvers } from './gen-types';

// endpoints
const TRAINING = 'ratio/training';
const TICKET = 'ratio/ticket';
const TRAINER = 'ratio/trainers';

export const resolvers: Resolvers = {
  Query: {
    ratioTrainings: (_, { page }, { dataSources }) =>
      dataSources.kochergaAPI.listPage({
        resource: TRAINING,
        page,
      }),
    ratioTrainingBySlug: (_, { slug }, { dataSources }) =>
      dataSources.kochergaAPI.retrieve({ resource: TRAINING, id: slug }),
    ratioTrainersAll: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.list({ resource: TRAINER }),
  },
  Mutation: {
    ratioAddTraining: (_, { params }, { dataSources }) =>
      dataSources.kochergaAPI.create({ resource: TRAINING, params }),
    ratioAddTicket: (_, { params }, { dataSources }) =>
      dataSources.kochergaAPI.create({ resource: TICKET, params }),
    ratioTrainingCopyScheduleFrom: async (_, { params }, { dataSources }) => {
      await dataSources.kochergaAPI.postDetailsAction({
        resource: TRAINING,
        id: params.to_training_slug,
        action: 'copy_schedule_from',
        params: { src_training_slug: params.from_training_slug },
      });
      return true;
    },
    ratioTrainingAddDay: async (_, { params }, { dataSources }) => {
      await dataSources.kochergaAPI.postDetailsAction({
        resource: TRAINING,
        id: params.training_slug,
        action: 'add_day',
        params: { date: params.date },
      });
      return true;
    },
    ratioTicketFiscalize: async (_, { ticket_id }, { dataSources }) => {
      await dataSources.kochergaAPI.postDetailsAction({
        resource: TICKET,
        id: ticket_id,
        action: 'fiscalize',
      });
      return true;
    },
  },
  RatioTraining: {
    tickets: (parent, _, { dataSources }) =>
      dataSources.kochergaAPI.list({
        resource: `${TRAINING}/${parent.slug}/tickets`,
      }),
    schedule: async (parent, _, { dataSources }) => {
      const schedule = await dataSources.kochergaAPI.list({
        resource: `${TRAINING}/${parent.slug}/schedule`,
      });
      return schedule.map((day: any) => ({
        id: day.id,
        date: day.date,
        activities: day.schedule,
      }));
    },
  },
  RatioActivity: {
    trainer: async (parent, _, { dataSources }) => {
      const trainer_id = (parent as any).trainer_id as string | null;
      if (!trainer_id) {
        return null;
      }
      return await dataSources.kochergaAPI
        .loader({ resource: TRAINER })
        .load(trainer_id);
    },
  },
};
