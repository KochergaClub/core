import Link from 'next/link';

import { A } from '~/frontkit';

import { MastermindDatingCohortSummaryFragment as CohortFragment } from '../../queries.generated';

import { format, parseISO } from 'date-fns';

const CohortItem = ({ cohort }: { cohort: CohortFragment }) => {
  let title = String(cohort.id);
  if (cohort.event?.start) {
    const start = format(parseISO(cohort.event.start), 'yyyy-MM-dd');
    title += ' ' + ` (${start})`;
  }
  return (
    <div>
      <Link
        href="/team/mastermind_dating/cohort/[id]"
        as={`/team/mastermind_dating/cohort/${cohort.id}`}
        passHref
      >
        <A>{title}</A>
      </Link>
    </div>
  );
};

export default CohortItem;
