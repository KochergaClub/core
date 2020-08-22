import { gql } from '@apollo/client';
import { Row } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';
import FbIcon from '~/components/icons/FbIcon';
import VkIcon from '~/components/icons/VkIcon';
import YoutubeIcon from '~/components/icons/YoutubeIcon';

import { BlockComponent } from '../../types';
import { FrontSocialLinksBlockFragment as Props } from './index.generated';

const FrontSocialLinksBlock: BlockComponent<Props> = (block) => {
  // FIXME - move links to config
  return (
    <PaddedBlock>
      <Row centered gutter={16}>
        <a href="https://www.facebook.com/kocherga.club">
          <FbIcon color="black" size={48} />
        </a>
        <a href="https://vk.com/kocherga_club">
          <VkIcon color="black" size={48} />
        </a>
        <a href="https://www.youtube.com/channel/UCeLSDFOndl4eKFutg3oowHg">
          <YoutubeIcon color="black" size={48} />
        </a>
      </Row>
    </PaddedBlock>
  );
};

FrontSocialLinksBlock.fragment = gql`
  fragment FrontSocialLinksBlock on FrontSocialLinksBlock {
    id
  }
`;

export default FrontSocialLinksBlock;
