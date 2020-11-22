import 'react-toggle/style.css';

import ReactToggle from 'react-toggle';
import styled from 'styled-components';

import * as colors from '../colors';

const StyledToggle = styled(ReactToggle)`
  &.react-toggle--checked {
    .react-toggle-track {
      background-color: ${colors.good[500]};
    }
    .react-toggle-thumb {
      border-color: ${colors.good[500]};
    }

    &:hover {
      .react-toggle-track {
        background-color: ${colors.good[700]};
      }
      .react-toggle-thumb {
        border-color: ${colors.good[700]};
      }
    }
  }
`;

export const Toggle = StyledToggle;
