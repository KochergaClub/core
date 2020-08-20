import styled from 'styled-components';

import { ColumnsBlock, fonts, RichText } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';

import { ColumnsBasicBlockFragment as Props } from './fragments.generated';

const Header = styled.h2`
  font-size: ${fonts.sizes.L};
  text-align: center;
`;

const Text = styled(RichText)``;

const OneColumn = (column: Props['basic_columns'][0]) => (
  <div>
    <Header>{column.header}</Header>
    {column.text && <Text dangerouslySetInnerHTML={{ __html: column.text }} />}
  </div>
);

export default function ColumnsBasicBlock(block: Props) {
  return (
    <PaddedBlock width="wide">
      <ColumnsBlock>
        {block.basic_columns.map((column, i) => (
          <OneColumn {...column} key={i} />
        ))}
      </ColumnsBlock>
    </PaddedBlock>
  );
}
