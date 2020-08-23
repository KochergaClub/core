import styled from 'styled-components';

import { gql } from '@apollo/client';
import { Button, Column, ColumnsBlock, fonts } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';

import { BlockComponent } from '../../types';
import { ColumnsButtonsBlockFragment as Props } from './index.generated';

const Header = styled.div`
  font-size: ${fonts.sizes.L};
  font-weight: bold;
`;

const Text = styled.div``;

const ColumnContainer = styled(Column)`
  text-align: center;
`;

const Image = styled.img`
  width: 400px;
  height: auto;
`;

const OneColumn = (column: Props['button_columns'][0]) => (
  <div>
    <ColumnContainer gutter={16} centered>
      {column.image && <Image src={column.image.url} />}
      <Header>{column.title}</Header>
      <Text>{column.text}</Text>
      <Button onClick={() => window.alert(column.link)}>
        {column.caption}
      </Button>
    </ColumnContainer>
  </div>
);

const ColumnsButtonsBlock: BlockComponent<Props> = (block) => {
  return (
    <PaddedBlock>
      <ColumnsBlock>
        {block.button_columns.map((column, i) => (
          <OneColumn {...column} key={i} />
        ))}
      </ColumnsBlock>
    </PaddedBlock>
  );
};

ColumnsButtonsBlock.fragment = gql`
  fragment ColumnsButtonsBlock on ColumnsButtonsBlock {
    id
    button_columns: value {
      title
      text
      image(spec: "original") {
        id
        url
      }
      caption
      link
    }
  }
`;

export default ColumnsButtonsBlock;
