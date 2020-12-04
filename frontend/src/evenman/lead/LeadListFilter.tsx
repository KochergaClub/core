import { useCallback } from 'react';

import { CommunityLeadsFilterInput, CommunityLeadStatus } from '~/apollo/types.generated';
import { RadioButtonGroup } from '~/frontkit';

export type FilterName = 'all' | 'active';

export const filterNameToInput: {
  [k in FilterName]: CommunityLeadsFilterInput;
} = {
  active: { status: CommunityLeadStatus.Active },
  curated_by_me: { status: CommunityLeadStatus.Active, curated_by_me: true },
  all: {},
};

interface Props {
  filter: FilterName;
  setFilter: (f: FilterName) => void;
}

export const LeadListFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const asyncSetFilter = useCallback(
    async (name: FilterName) => {
      setFilter(name);
    },
    [setFilter]
  );

  return (
    <RadioButtonGroup selected={filter} select={asyncSetFilter}>
      <RadioButtonGroup.Button name="active">Активные</RadioButtonGroup.Button>
      <RadioButtonGroup.Button name="curated_by_me">
        Активные курируемые мной
      </RadioButtonGroup.Button>
      <RadioButtonGroup.Button name="all">Все</RadioButtonGroup.Button>
    </RadioButtonGroup>
  );
};
