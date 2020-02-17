import styled from 'styled-components';

import { staticUrl } from '~/common/utils';

const progressCSS = `
  :before {
	  content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
    z-index: 499;
	  pointer-events: all;
  }

  :after {
    /* with no content, nothing is rendered */
    content: "";
    position: absolute;
    top: 30%;
    left: 0;
    width: 100%;
    height: 120px;
    z-index: 500;
    /* background */
    background-image: url(${staticUrl('logo.png')});
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 120px 120px;

    /* animation */
    visibility: hidden;
    animation: 1s infinite linearRotate linear;
    animation-delay: 1s;
  }

  @keyframes linearRotate {
    from {
      transform: rotate(0deg);
    }
    to {
      visibility: visible;
      transform: rotate(360deg);
    }
  }
`;

interface Props {
  progress: boolean;
}

const UpdatingOverlay = styled('div')<Props>`
  position: relative;
  ${(props: any) => (props.progress ? progressCSS : '')}
`;

export default UpdatingOverlay;
