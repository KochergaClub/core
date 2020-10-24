import { A } from '~/frontkit';

import { PaddedBlock } from '~/components';

import { FaqEntryFragment } from '../fragments.generated';

interface Props {
  entries: FaqEntryFragment[];
}

const EntryLink: React.FC<{ entry: FaqEntryFragment }> = ({ entry }) => (
  <div>
    <A href={`#entry${entry.id}`}>{entry.question}</A>
  </div>
);

const EntryIndexBlock: React.FC<Props> = ({ entries }) => (
  <PaddedBlock>
    {entries.map(entry => (
      <EntryLink key={entry.id} entry={entry} />
    ))}
  </PaddedBlock>
);

export default EntryIndexBlock;
