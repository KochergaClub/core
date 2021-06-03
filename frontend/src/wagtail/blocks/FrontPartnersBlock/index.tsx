import { gql } from '@apollo/client';

import { PaddedBlock } from '~/components';
import { Row } from '~/frontkit';

import { BlockComponent } from '../../types';
import { FrontPartnersBlockFragment as Props } from './index.generated';

const Partner: React.FC<{ partner: Props['partners'][0] }> = ({ partner }) => {
  return (
    <a href={partner.link}>
      <img
        className="filter grayscale hover:filter-none"
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
        id
        url
        original_image {
          id
        }
      }
      image_x2: image(spec: "width-320") {
        id
        url
        original_image {
          id
        }
      }
    }
  }
`;

export default FrontPartnersBlock;
