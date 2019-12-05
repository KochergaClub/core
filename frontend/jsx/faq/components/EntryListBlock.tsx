import styled from 'styled-components';

import { RichText } from '@kocherga/frontkit';

import PaddedBlock from '~/components/PaddedBlock';

import { Entry } from '../types';

interface Props {
  entries: Entry[];
}

const Header = styled.header`
  font-weight: bold;
`;

const EntryCard: React.FC<{ entry: Entry }> = ({ entry }) => (
  <div id={`entry${entry.id}`}>
    <Header>{entry.question}</Header>
    <RichText dangerouslySetInnerHTML={{ __html: entry.answer }} />
  </div>
);

const EntryList: React.FC<Props> = ({ entries }) => {
  return (
    <div>
      {entries.map(entry => (
        <EntryCard entry={entry} />
      ))}
    </div>
  );
};

const EntryListBlock: React.FC<Props> = props => {
  return (
    <PaddedBlock>
      <EntryList {...props} />
    </PaddedBlock>
  );
};

export default EntryListBlock;
