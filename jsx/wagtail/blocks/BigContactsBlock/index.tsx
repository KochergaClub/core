import React from 'react';
import styled from 'styled-components';

import SocialIcons from '~/components/TildaMenu/SocialIcons';

import { fonts, colors } from '@kocherga/frontkit';

import { BigContactsBlockType as Props } from '../types';

const TwoColumns = styled.div`
  display: flex;
  flex-direction: row;

  > * {
    flex-basis: 0;
    flex-grow: 1;
  }
`;

const MapIFrame = styled.iframe`
  height: 90vh;
  border: none;
`;

const BigText = styled.div`
  font-size: ${fonts.sizes.L};
`;

const RightColumn = styled.div`
  background-color: black;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightContent = styled.div`
  max-width: 480px;
`;

const Text = styled.div`
  margin: 32px 0;
`;

const Link = styled.a`
  text-decoration: none;
  color: ${colors.accent[500]};
`;

const KEY = 'AIzaSyDTpyJfFT0Taz2DuiTJl5ng64Dn3st02TI'; // FIXME

export default function BigContactsBlock(props: Props) {
  return (
    <TwoColumns>
      <MapIFrame
        src={`https://www.google.com/maps/embed/v1/view?center=${
          props.value.map.lat
        },${props.value.map.lng}&zoom=16&key=${KEY}`}
        allowFullScreen
      />
      <RightColumn>
        <RightContent>
          <BigText>{props.value.address}</BigText>
          <BigText>
            Телефон:{' '}
            <Link href={`tel:${props.value.phone}`}>{props.value.phone}</Link>
          </BigText>
          <BigText>
            Email:{' '}
            <Link href={`email:${props.value.email}`}>{props.value.email}</Link>
          </BigText>
          <Text>{props.value.text}</Text>
          <SocialIcons />
        </RightContent>
      </RightColumn>
    </TwoColumns>
  );
}
