import React from 'react';

import { gql } from '@apollo/client';

import { ColumnsBlock, ResponsivePadding, RichText } from '~/frontkit';

import { BlockComponent } from '../../types';
import { AnchorBlockFragment as Props } from './index.generated';

const ImageWithTextBlock: BlockComponent<Props> = ({
  image_with_text: value,
}) => {
  return (
    <div className="py-10">
      <ResponsivePadding>
        <ColumnsBlock>
          <RichText dangerouslySetInnerHTML={{ __html: value.text }} />
          <img
            className="block max-w-lg w-full"
            src={value.image.url}
            srcSet={`${value.image.url}, ${value.image_x2.url} 2x`}
          />
        </ColumnsBlock>
      </ResponsivePadding>
    </div>
  );
};

ImageWithTextBlock.fragment = gql`
  fragment ImageWithTextBlock on ImageWithTextBlock {
    id
    image_with_text: value {
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
    }
  }
`;

export default ImageWithTextBlock;
