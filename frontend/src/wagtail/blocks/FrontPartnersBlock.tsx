import styled from 'styled-components';

import { Row } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';

import { FrontPartnersBlockFragment as Props } from './fragments.generated';

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

export default function BasicParagraphBlock(block: Props) {
  return (
    <PaddedBlock>
      <Row wrap={true} gutter={32} centered vCentered>
        {block.partners.map((partner, i) => (
          <Partner key={i} partner={partner} />
        ))}
      </Row>
    </PaddedBlock>
  );
}
