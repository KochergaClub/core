import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

import { gql, useQuery } from '@apollo/client';
import { colors, deviceMediaQueries, fonts } from '@kocherga/frontkit';

import { SpecialOfferDocument } from './SpecialOffer.generated';

const mainColor = colors.primary[500];

const Container = styled.div`
  position: relative;
  ${deviceMediaQueries.desktop(`
    position: fixed;
    bottom: 0;
  `)}
  width: 100%;
  background-color: ${mainColor};
  color: white;
  padding: 12px 40px;
  z-index: 8;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  > * + * {
    margin-top: 8px;
  }
  ${deviceMediaQueries.desktop(`
    flex-direction: row;
    > * + * {
      margin-left: 12px;
      margin-top: 0;
    }
  `)};
  justify-content: center;
  align-items: center;
`;

const Button = styled.a`
  padding: 6px 20px;
  border-radius: 100px;
  border: none;
  font-weight: bold;
  text-align: center;
  background-color: white;
  text-decoration: none;
  color: ${mainColor};
  font-size: ${fonts.sizes.S};
  text-transform: uppercase;
`;

const Text = styled.div`
  font-size: ${fonts.sizes.XS};
  ${deviceMediaQueries.desktop(`
    font-size: ${fonts.sizes.S};
  `)}
  text-align: center;
  font-weight: bold;
`;

const CLOSE_SIZE = 24;

const CloseContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  ${deviceMediaQueries.desktop(`
    right: 20px;
    top: 0;
    bottom: 0;
  `)}
  height: ${CLOSE_SIZE}px;
  margin: auto;
  cursor: pointer;
  transition: opacity ease-in-out 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const Close: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return <MdClose size={CLOSE_SIZE} onClick={onClick} />;
};

const LOCAL_STORAGE_KEY = 'specialOfferClosedTimestamp';

const SpecialOffer: React.FC = () => {
  const [closedTimestamp, setClosedTimestamp] = useState(() => {
    if (typeof window === 'undefined') {
      return; // do nothing on server side
    }
    const value = window.localStorage?.getItem(LOCAL_STORAGE_KEY);
    return value ? parseInt(value, 10) : undefined;
  });
  const queryResults = useQuery(SpecialOfferDocument);

  if (!queryResults.data) {
    return null; // quiet fallback, even on errors
  }

  const { specialOffer } = queryResults.data;

  if (!specialOffer) {
    return null; // no offer
  }

  if (
    closedTimestamp &&
    closedTimestamp + specialOffer.hide_duration * 1000 > new Date().getTime()
  ) {
    return null; // closed and still hidden
  }
  if (typeof window === 'undefined') {
    return null; // don't render on server since we don't know if offer was closed
  }

  const onClose = () => {
    const value = new Date().getTime();
    setClosedTimestamp(value);
    window.localStorage?.setItem(LOCAL_STORAGE_KEY, String(value));
  };

  return (
    <Container>
      <ContentContainer>
        <Text>{specialOffer.text}</Text>
        <Button href={specialOffer.link}>{specialOffer.button_text}</Button>
      </ContentContainer>
      <CloseContainer>
        <Close onClick={onClose} />
      </CloseContainer>
    </Container>
  );
};

gql`
  query SpecialOffer {
    specialOffer {
      text
      link
      button_text
      until
      hide_duration
    }
  }
`;

export default SpecialOffer;
