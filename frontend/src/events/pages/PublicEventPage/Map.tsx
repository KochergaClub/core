export const Map: React.FC = () => {
  // could be moved to config but doesn't change often anyway
  const contacts = {
    map: {
      lat: '55.745606',
      lng: '37.560490',
    },
    googlePlaceId: 'ChIJY_hS-sZLtUYRxUzs_WrjCgY',
  };

  return (
    <div className="max-w-7xl mx-auto">
      <iframe
        className="w-full h-screen border-0"
        src={`https://www.google.com/maps/embed/v1/place?center=${contacts.map.lat},${contacts.map.lng}&zoom=16&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=place_id:${contacts.googlePlaceId}`}
        allowFullScreen
      />
    </div>
  );
};
