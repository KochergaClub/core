import React from 'react';

import styled from 'styled-components';

import { colors, fonts, RichText } from '@kocherga/frontkit';

import ColumnsBlock from '~/components/ColumnsBlock';

import { ColumnsMembershipsBlockType as Props } from './types';

const Card = styled.div`
  border: 1px solid ${colors.grey[300]};
  border-radius: 16px;
  text-align: center;
`;

const Title = styled.header`
  font-size: ${fonts.sizes.L};
  font-weight: bold;
  margin-top: 48px;
`;
const Subtitle = styled.div``;

const PriceContainer = styled.div`
  font-size: ${fonts.sizes.XXL};
`;

const Price = ({ value }: { value: number }) => {
  return <PriceContainer>{value} руб.</PriceContainer>;
};

const Description = styled.div`
  margin-bottom: 42px;
`;

const MembershipCard = (membership: Props['value'][0]) => (
  <Card>
    <Title>{membership.title}</Title>
    <Subtitle>{membership.subtitle}</Subtitle>
    <Price value={membership.price} />
    <Description dangerouslySetInnerHTML={{ __html: membership.description }} />
  </Card>
);

export default function ColumnsBasicBlock(block: Props) {
  return (
    <ColumnsBlock>
      {block.value.map((column, i) => <MembershipCard {...column} key={i} />)}
    </ColumnsBlock>
  );
}
