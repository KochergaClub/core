import React from 'react';

import styled, { css } from 'styled-components';

import { fonts, colors } from '@kocherga/frontkit';

import { FeatureType } from './types';

const Container = styled.div`
  margin-bottom: 16px;
`;

const hiddenLink = css`
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Title = styled.div`
  font-size: ${fonts.sizes.XL};
  line-height: 1.2;

  ${hiddenLink};
`;

const Items = styled.div`
  font-size: ${fonts.sizes.S};
  color: ${colors.grey[800]};

  ${hiddenLink};
`;

const Feature = (props: FeatureType) => (
  <Container>
    <Title>
      {props.link ? <a href={props.link}>{props.title}</a> : props.title}
    </Title>
    <Items>
      {props.items
        .map((item, i) => (
          <span key={i}>
            {item.link ? <a href={item.link}>{item.text}</a> : item.text}
          </span>
        ))
        .reduce(
          (accu, elem) => (accu.length ? [...accu, ' · ', elem] : [elem]),
          []
        )}
    </Items>
  </Container>
);

export default Feature;
