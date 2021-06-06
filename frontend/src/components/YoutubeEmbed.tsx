import React from 'react';

interface Props {
  embedId: string;
}

export const YoutubeEmbed: React.FC<Props> = ({ embedId }) => (
  <div
    className="relative h-0 overflow-hidden max-w-full w-full"
    style={{ paddingTop: '56.25%' }}
  >
    <iframe
      className="absolute inset-0 w-full h-full"
      width="480"
      height="270"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);
