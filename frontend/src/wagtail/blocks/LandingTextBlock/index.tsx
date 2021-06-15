import clsx from 'clsx';

import { gql } from '@apollo/client';

import { PaddedBlock } from '~/components';
import { RichText } from '~/frontkit';
import { BlockComponent } from '~/wagtail/types';

import { LandingTextBlockFragment as Props } from './index.generated';

const LandingTextBlock: BlockComponent<Props> = (block) => {
  const { landing_text: value } = block;
  return (
    <div className={clsx(value.gray && 'bg-gray-100')}>
      <PaddedBlock>
        <RichText
          dangerouslySetInnerHTML={{ __html: value.text }}
          className={clsx(value.centered && 'text-center')}
          style={{
            ...(value.large && { fontSize: '1.4em' }),
          }}
        />
      </PaddedBlock>
    </div>
  );
};

LandingTextBlock.fragment = gql`
  fragment LandingTextBlock on LandingTextBlock {
    id
    landing_text: value {
      text
      centered
      large
      gray
    }
  }
`;

export default LandingTextBlock;
