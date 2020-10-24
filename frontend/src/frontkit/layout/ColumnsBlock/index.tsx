import * as React from 'react';
import styled from 'styled-components';

import { DeviceName, deviceMediaQueries } from '../../sizes';

interface Spacing {
  gap: number;
  direction: 'horizontal' | 'vertical';
}

type SpacingMap = {
  [k in DeviceName]: Spacing;
};

const defaultSpacingMap: SpacingMap = {
  mobile: {
    gap: 20,
    direction: 'vertical',
  },
  tablet: {
    gap: 20,
    direction: 'vertical',
  },
  laptop: {
    gap: 40,
    direction: 'horizontal',
  },
  desktop: {
    gap: 80,
    direction: 'horizontal',
  },
};

const spacingMap2style = (spaces: SpacingMap) => {
  return ''.concat(
    ...(Object.keys(spaces) as DeviceName[]).map(
      device => {
        const space = spaces[device]!;

        let deviceStyle = '';
        if (space.direction === 'horizontal') {
          deviceStyle += `
          > * + * {
            margin-left: ${space.gap}px;
          }
          `;
        } else {
          deviceStyle += `
          flex-direction: column;
          > * + * {
            margin-top: ${space.gap}px;
          }
          `;
        }

        return deviceMediaQueries[device](deviceStyle);
      }
    ));
};

interface Props {
  spaces: SpacingMap;
}

const ColumnsBlockWithoutDefaults = styled.div<Props>`
  display: flex;

  max-width: 1400px;
  margin: 0 auto;

  > * {
    flex-basis: 0;
    flex-grow: 1;
  }

  ${props => spacingMap2style(props.spaces)}
`;

type SpacingMapOverrides = {
  [k in DeviceName]?: Spacing;
};

export const ColumnsBlock: React.FC<{ spaces?: SpacingMapOverrides }> = ({ spaces, children }) => (
  <ColumnsBlockWithoutDefaults spaces={{...defaultSpacingMap, ...(spaces || {}) }}>
    {children}
  </ColumnsBlockWithoutDefaults>
);

/* Note that this component doesn't include any padding. You'll probably have to wrap it in <ResponsivePadding> or your own padding component. */

/*

<ColumnsBlock
  spaces={{
    desktop: {
      gap: 80,
      direction: 'horizontal',
    },
  }}
>
  <div>...</div>
  <div>...</div>
</ColumnsBlock>

*/
