import { useCallback } from 'react';

import { CommunityLeadsFilterInput, CommunityLeadStatus } from '~/apollo/types.generated';
import { RadioButtonGroup } from '~/frontkit';

export type FilterName = 'active' | 'my_active' | 'uncurated_active' | 'all';

export const filterNameToInput: {
  [k in FilterName]: CommunityLeadsFilterInput;
} = {
  active: { status: CommunityLeadStatus.Active },
  my_active: { status: CommunityLeadStatus.Active, curated_by_me: true },
  uncurated_active: {
    status: CommunityLeadStatus.Active,
    curated_by_empty: true,
  },
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
    <div>
      <RadioButtonGroup selected={filter} select={asyncSetFilter}>
        <RadioButtonGroup.Button name="active">
          Активные
        </RadioButtonGroup.Button>
        <RadioButtonGroup.Button name="my_active">
          Активные мои
        </RadioButtonGroup.Button>
        <RadioButtonGroup.Button name="uncurated_active">
          Активные неназначенные
        </RadioButtonGroup.Button>
        <RadioButtonGroup.Button name="all">Все</RadioButtonGroup.Button>
      </RadioButtonGroup>
    </div>
  );
};
