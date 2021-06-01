import { gql } from '@apollo/client';

import { RichText } from '~/frontkit';

import { BlockComponent } from '../../types';
import { SectionHeaderBlockFragment as Props } from './index.generated';

const SectionHeaderBlock: BlockComponent<Props> = (block) => {
  return (
    <div className="bg-gray-100 px-5 pt-12 pb-10">
      <h2 className="text-3xl text-center font-bold m-0">
        {block.section_header_value.header}
      </h2>
      {block.section_header_value.text && (
        <RichText
          className="max-w-3xl text-center mx-auto"
          dangerouslySetInnerHTML={{ __html: block.section_header_value.text }}
        />
      )}
    </div>
  );
};

SectionHeaderBlock.fragment = gql`
  fragment SectionHeaderBlock on SectionHeaderBlock {
    id
    section_header_value: value {
      header
      text
    }
  }
`;

export default SectionHeaderBlock;
