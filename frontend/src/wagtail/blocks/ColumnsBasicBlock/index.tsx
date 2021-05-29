import styled from 'styled-components';

import { gql } from '@apollo/client';

import { ColumnsBlock, fonts, ResponsivePadding, RichText } from '~/frontkit';

import { BlockComponent } from '../../types';
import { ColumnsBasicBlockFragment as Props } from './index.generated';

const VerticalPadding = styled.div`
  padding: 40px 0;
`;

const Header = styled.h2`
  font-size: ${fonts.sizes.XL2};
  text-align: center;
`;

const Text = styled(RichText)``;

const OneColumn = (column: Props['basic_columns'][0]) => (
  <div>
    <Header>{column.header}</Header>
    {column.text && <Text dangerouslySetInnerHTML={{ __html: column.text }} />}
  </div>
);

const ColumnsBasicBlock: BlockComponent<Props> = (block) => {
  return (
    <VerticalPadding>
      <ResponsivePadding>
        <ColumnsBlock>
          {block.basic_columns.map((column, i) => (
            <OneColumn {...column} key={i} />
          ))}
        </ColumnsBlock>
      </ResponsivePadding>
    </VerticalPadding>
  );
};

ColumnsBasicBlock.fragment = gql`
  fragment ColumnsBasicBlock on ColumnsBasicBlock {
    id
    basic_columns: value {
      header
      text
    }
  }
`;

export default ColumnsBasicBlock;
