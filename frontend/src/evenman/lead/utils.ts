import { CommunityLeadStatus } from '~/apollo/types.generated';

export const statusNames = {
  [CommunityLeadStatus.Active]: 'Активный',
  [CommunityLeadStatus.Inactive]: 'Неактивный',
};
