import styled from 'styled-components';

import { colors, deviceMediaQueries, fonts } from '~/frontkit';

const Container = styled.div`
  background-color: ${colors.grey[100]};
  text-align: center;
`;

const Top = styled.div`
  display: block;
  padding-top: 24px;
  text-align: center;
`;

const Bottom = styled.div`
  display: block;
  padding-bottom: 24px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 24px 0;
  line-height: 1.2;

  font-size: ${fonts.sizes.XL5};

  ${deviceMediaQueries.mobile(`
    font-size: ${fonts.sizes.XL2};
  `)}
  ${deviceMediaQueries.tablet(`
    font-size: ${fonts.sizes.XL3};
  `)}
`;

interface Props {
  title: string;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
}

export default function PageHeader({ title, top, bottom }: Props) {
  return (
    <Container>
      <Top>{top}</Top>
      <Title>{title}</Title>
      <Bottom>{bottom}</Bottom>
    </Container>
  );
}
