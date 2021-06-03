import { useCallback } from 'react';

import { gql } from '@apollo/client';

import { Button, Column, ColumnsBlock, ResponsivePadding } from '~/frontkit';

import { BlockComponent } from '../../types';
import { ColumnsButtonsBlockFragment as Props } from './index.generated';

const OneColumn: React.FC<Props['button_columns'][0]> = (column) => {
  const navigate = useCallback(() => {
    window.location.href = column.link;
  }, [column.link]);

  return (
    <div>
      <Column gutter={16} centered>
        {column.image && (
          <img
            className="max-w-lg w-full"
            src={column.image.url}
            srcSet={`${column.image.url}, ${column.image_x2.url} 2x`}
          />
        )}
        <div className="text-2xl font-bold">{column.title}</div>
        <div className="text-center">{column.text}</div>
        <Button onClick={navigate}>{column.caption}</Button>
      </Column>
    </div>
  );
};

const ColumnsButtonsBlock: BlockComponent<Props> = (block) => {
  return (
    <div className="py-10">
      <ResponsivePadding>
        <ColumnsBlock>
          {block.button_columns.map((column, i) => (
            <OneColumn {...column} key={i} />
          ))}
        </ColumnsBlock>
      </ResponsivePadding>
    </div>
  );
};

// TODO - calculate spec for image (based on number of columns and gutter size? no, that's too fragile...)
ColumnsButtonsBlock.fragment = gql`
  fragment ColumnsButtonsBlock on ColumnsButtonsBlock {
    id
    button_columns: value {
      title
      text
      image(spec: "width-512") {
        id
        url
        original_image {
          id
        }
      }
      image_x2: image(spec: "width-1024") {
        id
        url
      }
      caption
      link
    }
  }
`;

export default ColumnsButtonsBlock;
