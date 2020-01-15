import styled from 'styled-components';

import { fonts, RichText, ColumnsBlock } from '@kocherga/frontkit';

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
    <ColumnsBlock>
      {block.basic_columns.map((column, i) => (
        <OneColumn {...column} key={i} />
      ))}
    </ColumnsBlock>
  );
}
