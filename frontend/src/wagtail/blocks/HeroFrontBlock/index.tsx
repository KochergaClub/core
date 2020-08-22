import styled from 'styled-components';

import { gql } from '@apollo/client';
import { colors } from '@kocherga/frontkit';

import { staticUrl } from '~/common/utils';

import { BlockComponent } from '../../types';
import HeroButtons from './HeroButtons';
import { HeroFrontBlockFragment as Props } from './index.generated';

const Container = styled.div`
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  justify-content: center;

  background: right center no-repeat url("${staticUrl('logo/logo-512.png')}"),
    radial-gradient(
      circle at center left,
      ${colors.primary[500]},
      ${colors.accent[500]}
    );
`;

const Header = styled.h1`
  font-size: 52px;
  color: white;
  max-width: 600px;
`;

const HeroFrontBlock: BlockComponent<Props> = (props) => {
  return (
    <Container>
      <Header>{props.hero.title}</Header>
      <HeroButtons buttons={props.hero.buttons} />
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
      }
    }
  }
`;

export default HeroFrontBlock;
