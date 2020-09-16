import { useCallback } from 'react';
import styled from 'styled-components';

import { gql } from '@apollo/client';
import { Button, Column, ColumnsBlock, fonts, ResponsivePadding } from '@kocherga/frontkit';

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
  width: 100%;
  height: auto;
`;

const VerticalPadding = styled.div`
  padding: 40px 0;
`;

const OneColumn = (column: Props['button_columns'][0]) => {
  const navigate = useCallback(() => {
    window.location.href = column.link;
  }, [column.link]);
  return (
    <div>
      <ColumnContainer gutter={16} centered>
        {column.image && <Image src={column.image.url} />}
        <Header>{column.title}</Header>
        <Text>{column.text}</Text>
        <Button onClick={navigate}>{column.caption}</Button>
      </ColumnContainer>
    </div>
  );
};

const ColumnsButtonsBlock: BlockComponent<Props> = (block) => {
  return (
    <VerticalPadding>
      <ResponsivePadding>
        <ColumnsBlock>
          {block.button_columns.map((column, i) => (
            <OneColumn {...column} key={i} />
          ))}
        </ColumnsBlock>
      </ResponsivePadding>
    </VerticalPadding>
  );
};

// TODO - calculate spec for image (based on number of columns and gutter size? no, that's too fragile...)
ColumnsButtonsBlock.fragment = gql`
  fragment ColumnsButtonsBlock on ColumnsButtonsBlock {
    id
    button_columns: value {
      title
      text
      image(spec: "original") {
        id
        url
        original_image {
          id
        }
      }
      caption
      link
    }
  }
`;

export default ColumnsButtonsBlock;
