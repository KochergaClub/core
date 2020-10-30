import React from 'react';
import styled from 'styled-components';

import { colors, Column, Row } from './';

export default {
  title: 'Общее/Цвета',
};

const ColorBox = styled.div`
  height: 50px;
  flex: 1;
  background-color: ${(props) => props.color};
  text-align: center;
  line-height: 50px;
`;

export const AllColors = () => (
  <Column stretch>
    <Row stretch>
      {[100, 300, 500, 700, 900].map((code) => (
        <ColorBox key={code} color={colors.primary[code]}>
          primary/{code}
        </ColorBox>
      ))}
    </Row>
    <Row stretch>
      {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((code) => (
        <ColorBox key={code} color={colors.grey[code]}>
          grey/{code}
        </ColorBox>
      ))}
    </Row>
    <Row stretch>
      {[100, 300, 500, 700, 900].map((code) => (
        <ColorBox key={code} color={colors.accent[code]}>
          accent/{code}
        </ColorBox>
      ))}
    </Row>
  </Column>
);
AllColors.storyName = 'Все цвета';
