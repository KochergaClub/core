import { PaddedBlock } from '~/components';
import { RichText } from '~/frontkit';

import { FaqEntryFragment } from '../fragments.generated';

interface Props {
  entries: FaqEntryFragment[];
}

const EntryCard: React.FC<{ entry: FaqEntryFragment }> = ({ entry }) => (
  <div className="mb-4" id={`entry${entry.id}`}>
    <header className="font-bold">{entry.question}</header>
    <RichText dangerouslySetInnerHTML={{ __html: entry.answer }} />
  </div>
);

const EntryList: React.FC<Props> = ({ entries }) => {
  return (
    <div>
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

const EntryListBlock: React.FC<Props> = (props) => {
  return (
    <PaddedBlock>
      <EntryList {...props} />
    </PaddedBlock>
  );
};

export default EntryListBlock;
