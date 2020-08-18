import styled from 'styled-components';

import { colors } from '@kocherga/frontkit';

import { HeroFrontBlockFragment as Props } from '../fragments.generated';
import HeroButtons from './HeroButtons';

const Container = styled.div`
  background-color: ${colors.grey[100]};
  margin: 0 auto;
  padding-top: 96px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: block;
  margin: 0 auto;

  font-size: 48px;
  font-weight: 700;
  letter-spacing: 2px;
  line-height: 1;
  text-transform: uppercase;
  text-align: center;
  color: ${colors.primary[900]};
`;

export default function HeroFrontBlock(props: Props) {
  return (
    <Container>
      <Header>{props.hero.title}</Header>
      <HeroButtons buttons={props.hero.buttons} />
    </Container>
  );
}
