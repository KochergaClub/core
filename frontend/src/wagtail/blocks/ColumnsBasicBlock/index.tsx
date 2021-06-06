import { gql } from '@apollo/client';

import { ColumnsBlock, ResponsivePadding, RichText } from '~/frontkit';

import { BlockComponent } from '../../types';
import { ColumnsBasicBlockFragment as Props } from './index.generated';

const OneColumn = (column: Props['basic_columns'][0]) => (
  <div className="max-w-xl">
    <header className="text-2xl font-bold text-center">{column.header}</header>
    {column.text && (
      <RichText dangerouslySetInnerHTML={{ __html: column.text }} />
    )}
  </div>
);

const ColumnsBasicBlock: BlockComponent<Props> = (block) => {
  return (
    <div className="py-10">
      <ResponsivePadding>
        <ColumnsBlock>
          {block.basic_columns.map((column, i) => (
            <OneColumn {...column} key={i} />
          ))}
        </ColumnsBlock>
      </ResponsivePadding>
    </div>
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
