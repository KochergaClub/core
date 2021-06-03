import React from 'react';

import { colors, Column, Row } from './';

export default {
  title: 'Общее/Цвета',
};

const ColorBox: React.FC<{ color: string }> = ({ children, color }) => (
  <div
    className="h-12 flex-1 flex justify-center items-center"
    style={{ backgroundColor: color }}
  >
    {children}
  </div>
);

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
