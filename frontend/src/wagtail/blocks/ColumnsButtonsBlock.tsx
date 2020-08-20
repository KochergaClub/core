import styled from 'styled-components';

import { Button, ColumnsBlock, fonts } from '@kocherga/frontkit';

import { ColumnsButtonsBlockFragment as Props } from './fragments.generated';

const Header = styled.div`
  font-size: ${fonts.sizes.L};
`;

const Text = styled.div`
  margin-bottom: 20px;
`;

const ColumnContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 400px;
  height: auto;
`;

const OneColumn = (column: Props['button_columns'][0]) => (
  <div>
    <ColumnContainer>
      <Header>{column.title}</Header>
      {column.image && <Image src={column.image.url} />}
      <Text>{column.text}</Text>
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
