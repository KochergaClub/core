import styled from 'styled-components';

import { gql } from '@apollo/client';
import { Row } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';

import { BlockComponent } from '../../types';
import { FrontPartnersBlockFragment as Props } from './index.generated';

const Image = styled.img`
  filter: grayscale(100%);

  &:hover {
    filter: none;
  }
`;

const Partner: React.FC<{ partner: Props['partners'][0] }> = ({ partner }) => {
  return (
    <a href={partner.link}>
      <Image
        src={partner.image.url}
        srcSet={`${partner.image.url}, ${partner.image_x2.url} 2x`}
      />
    </a>
  );
};

const FrontPartnersBlock: BlockComponent<Props> = (block) => {
  return (
    <PaddedBlock>
      <Row wrap={true} gutter={32} centered vCentered>
        {block.partners.map((partner, i) => (
          <Partner key={i} partner={partner} />
        ))}
      </Row>
    </PaddedBlock>
  );
};

FrontPartnersBlock.fragment = gql`
  fragment FrontPartnersBlock on FrontPartnersBlock {
    id
    partners: value {
      link
      image(spec: "width-160") {
        url
      }
      image_x2: image(spec: "width-320") {
        url
      }
    }
  }
`;

export default FrontPartnersBlock;
