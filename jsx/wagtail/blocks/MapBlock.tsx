import React from 'react';
import styled from 'styled-components';

const MapIFrame = styled.iframe`
  width: 50%;
  height: 90vh;
  border: none;
`;

const KEY = 'AIzaSyDTpyJfFT0Taz2DuiTJl5ng64Dn3st02TI'; // FIXME

export default function MapBlock() {
  return (
    <MapIFrame
      src={`https://www.google.com/maps/embed/v1/place?center=${lat},${lng}&key=${KEY}`}
      allowFullScreen
    />
  );
}
