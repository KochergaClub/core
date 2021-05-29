import styled from 'styled-components';

import { gql } from '@apollo/client';

import SocialIcons from '~/components/Page/PageMenu/SocialIcons';
import { colors, fonts } from '~/frontkit';

import { BlockComponent } from '../../types';
import { BigContactsBlockFragment as Props } from './index.generated';

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
  font-size: ${fonts.sizes.XL2};
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

const BigContactsBlock: BlockComponent<Props> = (props) => {
  return (
    <TwoColumns>
      <MapIFrame
        src={`https://www.google.com/maps/embed/v1/view?center=${props.contacts.map.lat},${props.contacts.map.lng}&zoom=16&key=${KEY}`}
        allowFullScreen
      />
      <RightColumn>
        <RightContent>
          <BigText>{props.contacts.address}</BigText>
          <BigText>
            Телефон:{' '}
            <Link href={`tel:${props.contacts.phone}`}>
              {props.contacts.phone}
            </Link>
          </BigText>
          <BigText>
            Email:{' '}
            <Link href={`email:${props.contacts.email}`}>
              {props.contacts.email}
            </Link>
          </BigText>
          <Text>{props.contacts.text}</Text>
          <SocialIcons />
        </RightContent>
      </RightColumn>
    </TwoColumns>
  );
};

BigContactsBlock.fragment = gql`
  fragment BigContactsBlock on BigContactsBlock {
    id
    contacts: value {
      map {
        lat
        lng
      }
      address
      phone
      email
      text
    }
  }
`;

export default BigContactsBlock;
