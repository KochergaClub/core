import * as React from 'react';

import styled from 'styled-components';

import * as colors from '../colors';
import * as fonts from '../fonts';

const HugeToast = styled.div`
  position: fixed;
  width: 80vw;
  height: 80vh;
  left: 10vw;
  top: 10vh;

  box-sizing: border-box;
  z-index: 100;

  background-color: ${colors.grey[800]};
  color: white;
  text-align: center;
  opacity: 0.95;
  border-radius: 5px;
  padding-top: 25vh;
  font-size: ${fonts.sizes.L};
  pointer: cursor;

  a {
    color: lightblue;
  }
`;

const reloadWindow = () => window.location.reload();

export const ReloadToast = () => (
  <HugeToast onClick={reloadWindow}>
    Код приложения обновился. Пожалуйста, <a href="/">обновите страницу</a>.
  </HugeToast>
);
