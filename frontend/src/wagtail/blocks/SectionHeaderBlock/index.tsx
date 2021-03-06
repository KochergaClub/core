import styled from 'styled-components';

import { gql } from '@apollo/client';
import { colors, fonts, RichText } from '~/frontkit';

import { BlockComponent } from '../../types';
import { SectionHeaderBlockFragment as Props } from './index.generated';

const Container = styled(RichText)`
  background-color: ${colors.grey[100]};
  padding: 48px 20px 40px;
`;

const Header = styled.h2`
  font-size: ${fonts.sizes.XL};
  font-weight: 700;
  text-align: center;
  margin: 0;
  line-height: 1.2;
`;

const Text = styled(RichText)`
  max-width: 800px;
  text-align: center;
  margin: 0 auto;
`;

const SectionHeaderBlock: BlockComponent<Props> = (block) => {
  return (
    <Container>
      <Header>{block.section_header_value.header}</Header>
      {block.section_header_value.text && (
        <Text
          dangerouslySetInnerHTML={{ __html: block.section_header_value.text }}
        />
      )}
    </Container>
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
