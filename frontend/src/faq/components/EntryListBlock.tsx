import styled from 'styled-components';

import { RichText } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';

import { Entry } from '../types';

interface Props {
  entries: Entry[];
}

const Header = styled.header`
  font-weight: bold;
`;

const DivWithFixedMargins = styled.div`
  ul {
    margin-bottom: 16px;
  }
`;

const EntryCard: React.FC<{ entry: Entry }> = ({ entry }) => (
  <DivWithFixedMargins id={`entry${entry.id}`}>
    <Header>{entry.question}</Header>
    <RichText dangerouslySetInnerHTML={{ __html: entry.answer }} />
  </DivWithFixedMargins>
);

const EntryList: React.FC<Props> = ({ entries }) => {
  return (
    <div>
      {entries.map(entry => (
        <EntryCard key={entry.id} entry={entry} />
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
