import React from 'react';

import styled from 'styled-components';

import { PhotoRibbonBlockType as Props } from '../types';

const Container = styled.div`
  display: flex;
  overflow: hidden;
  height: 160px;
`;

const Image = styled.img`
  height: 160px;
  width: auto;
  object-fit: cover;
`;

export default function PhotoRibbonBlock(props: Props) {
  return (
    <Container>
      {props.value.map((photo, i) => <Image key={i} src={photo.file320} />)}
    </Container>
  );
}
