import styled from 'styled-components';

import { gql } from '@apollo/client';
import { colors, deviceMediaQueries, fonts } from '@kocherga/frontkit';

import { staticUrl } from '~/common/utils';

import { BlockComponent } from '../../types';
import HeroButtons from './HeroButtons';
import { HeroFrontBlockFragment as Props } from './index.generated';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);

  padding-left: 60px;
  padding-right: 40px;
  justify-content: center;
  ${deviceMediaQueries.mobile(`
    padding-left: 40px;
  `)}

  background: right 100px center / 400px no-repeat url("${staticUrl(
    'logo/logo.svg'
  )}"),
    radial-gradient(
      circle at center left,
      ${colors.primary[500]},
      ${colors.accent[500]}
    );
`;

const Header = styled.h1`
  font-size: ${fonts.sizes.XXXL};
  line-height: 1.2;
  ${deviceMediaQueries.mobile(`
    font-size: ${fonts.sizes.XL};
    text-align: center;
  `)}
  ${deviceMediaQueries.tablet(`
    font-size: ${fonts.sizes.XXL};
  `)}
  color: white;
`;

const ContentContainer = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(60vh - 60px);
`;

const HeroFrontBlock: BlockComponent<Props> = (props) => {
  return (
    <Container>
      <ContentContainer>
        <Header>{props.hero.title}</Header>
        <HeroButtons buttons={props.hero.buttons} />
      </ContentContainer>
    </Container>
  );
};

HeroFrontBlock.fragment = gql`
  fragment HeroFrontBlock on HeroFrontBlock {
    id
    hero: value {
      title
      buttons {
        title
        link
        highlight
      }
    }
  }
`;

export default HeroFrontBlock;
