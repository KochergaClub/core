import React from 'react';

import styled from 'styled-components';

import { colors } from '@kocherga/frontkit';

import { HeroFrontBlockType as Props } from '../types';

import LogoWithFeatures from './LogoWithFeatures';

const Container = styled.div`
  background-color: ${colors.grey[100]};
  margin: 0 auto;
  padding-top: 96px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerContainer = styled.div`
  margin: 0 auto;
  max-width: 940px;
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

const Line = styled.div`
  margin: 48px 0;
  border-bottom: 2px solid ${colors.primary[900]};
  width: 100%;
`;

export default function HeroFrontBlock(props: Props) {
  return (
    <Container>
      <InnerContainer>
        <Header>{props.value.title}</Header>
        <Line />
        <LogoWithFeatures features={props.value.features} />
      </InnerContainer>
    </Container>
  );
}
