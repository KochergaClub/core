import styled from 'styled-components';

import { staticUrl } from '~/common/utils';

import { FeaturesListType } from './types';

import Feature from './Feature';

const Logo = () => <img src={staticUrl('logo.png')} width="200" height="200" />;

const FeaturesList = ({ features }: { features: FeaturesListType }) => (
  <div>
    {features.map((feature, i) => (
      <Feature key={i} {...feature} />
    ))}
  </div>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > * + * {
    margin-left: 80px;
  }
`;

const LogoWithFeatures = ({ features }: { features: FeaturesListType }) => (
  <Container>
    <Logo />
    <FeaturesList features={features} />
  </Container>
);

export default LogoWithFeatures;
