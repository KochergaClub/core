import { format, parseISO } from 'date-fns';
import Link from 'next/link';

import { A } from '~/frontkit';
import { mastermindDatingCohortDetailsRoute } from '~/mastermind_dating/routes';

import { MastermindDatingCohortSummaryFragment as CohortFragment } from '../../queries.generated';

const CohortItem = ({ cohort }: { cohort: CohortFragment }) => {
  let title = String(cohort.id);
  if (cohort.event?.start) {
    const start = format(parseISO(cohort.event.start), 'yyyy-MM-dd');
    title += ' ' + ` (${start})`;
  }
  return (
    <div>
      <Link href={mastermindDatingCohortDetailsRoute(cohort.id)} passHref>
        <A>{title}</A>
      </Link>
    </div>
  );
};

export default CohortItem;
