import styled from 'styled-components';

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
  // could be moved to config but doesn't change often anyway
  const contacts = {
    map: {
      lat: '55.745606',
      lng: '37.560490',
    },
    googlePlaceId: 'ChIJY_hS-sZLtUYRxUzs_WrjCgY',
  };

  return (
    <Container>
      <MapIFrame
        src={`https://www.google.com/maps/embed/v1/place?center=${contacts.map.lat},${contacts.map.lng}&zoom=16&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=place_id:${contacts.googlePlaceId}`}
        allowFullScreen
      />
    </Container>
  );
};

export default Map;
