import React from 'react';

import styled from 'styled-components';

import { FeaturesListType } from './types';

import Feature from './Feature';

const Logo = () => <img src="/static/logo.png" width="200" height="200" />;

const FeaturesList = ({ features }: { features: FeaturesListType }) => (
  <div>{features.map((feature, i) => <Feature key={i} {...feature} />)}</div>
);

const Container = styled.div`
  max-width: 940px;
  display: flex;

  > * + * {
    margin-left: 40px;
  }
`;

const LogoWithFeatures = ({ features }: { features: FeaturesListType }) => (
  <Container>
    <Logo />
    <FeaturesList features={features} />
  </Container>
);

export default LogoWithFeatures;
