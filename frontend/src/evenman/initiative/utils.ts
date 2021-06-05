import { CommunityInitiativeStatus } from '~/apollo/types.generated';

export const statusNames = {
  [CommunityInitiativeStatus.Active]: 'Активный',
  [CommunityInitiativeStatus.Inactive]: 'Неактивный',
};
