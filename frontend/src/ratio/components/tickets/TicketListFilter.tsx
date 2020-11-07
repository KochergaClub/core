import { useCallback } from 'react';

import { RadioButtonGroup } from '~/frontkit';

import { RatioTicketsQueryVariables } from './queries.generated';

export type FilterName =
  | 'all'
  | 'unfiscalized'
  | 'missing-payments'
  | 'without-notion-link';

export const filterNameToInput: {
  [k in FilterName]: RatioTicketsQueryVariables['filter'];
} = {
  all: {},
  unfiscalized: {
    with_unfiscalized_checks: true,
  },
  'missing-payments': {
    with_missing_payments: true,
  },
  'without-notion-link': {
    without_notion_link: true,
  },
};

interface Props {
  filter: FilterName;
  setFilter: (f: FilterName) => void;
}

const TicketListFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const asyncSetFilter = useCallback(
    async (name: FilterName) => {
      setFilter(name);
    },
    [setFilter]
  );

  return (
    <RadioButtonGroup selected={filter} select={asyncSetFilter}>
      <RadioButtonGroup.Button name="all">Все</RadioButtonGroup.Button>
      <RadioButtonGroup.Button name="unfiscalized">
        С непробитыми чеками
      </RadioButtonGroup.Button>
      <RadioButtonGroup.Button name="missing-payments">
        С недостающими платежами
      </RadioButtonGroup.Button>
      <RadioButtonGroup.Button name="without-notion-link">
        Без ссылки на Notion
      </RadioButtonGroup.Button>
    </RadioButtonGroup>
  );
};

export default TicketListFilter;
