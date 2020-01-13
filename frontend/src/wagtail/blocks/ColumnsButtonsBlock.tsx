import styled from 'styled-components';

import { Button, ColumnsBlock } from '@kocherga/frontkit';

import { ColumnsButtonsBlockFragment as Props } from './fragments.generated';

const Text = styled.div`
  margin-bottom: 20px;
`;

const ColumnContainer = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const OneColumn = (column: Props['button_columns'][0]) => (
  <div>
    <ColumnContainer>
      <Text>{column.title}</Text>
      <Button onClick={() => window.alert(column.link)}>
        {column.caption}
      </Button>
    </ColumnContainer>
  </div>
);

export default function ColumnsBasicBlock(block: Props) {
  return (
    <ColumnsBlock>
      {block.button_columns.map((column, i) => (
        <OneColumn {...column} key={i} />
      ))}
    </ColumnsBlock>
  );
}
