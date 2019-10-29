import styled from 'styled-components';

import getConfig from 'next/config';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const MapIFrame = styled.iframe`
  width: 100%;
  height: 90vh;
  border: none;
`;

const Map: React.FC = () => {
  const { publicRuntimeConfig } = getConfig();
  return (
    <Container>
      <MapIFrame
        src={`https://www.google.com/maps/embed/v1/place?center=${
          publicRuntimeConfig.contacts.map.lat
        },${publicRuntimeConfig.contacts.map.lng}&zoom=16&key=${
          publicRuntimeConfig.googleMapsKey
        }&q=place_id:${publicRuntimeConfig.contacts.googlePlaceId}`}
        allowFullScreen
      />
    </Container>
  );
};

export default Map;
