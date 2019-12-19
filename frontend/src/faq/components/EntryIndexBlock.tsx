import { A } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';

import { Entry } from '../types';

interface Props {
  entries: Entry[];
}

const EntryLink: React.FC<{ entry: Entry }> = ({ entry }) => (
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
