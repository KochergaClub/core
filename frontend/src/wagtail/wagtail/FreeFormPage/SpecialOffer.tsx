import { useState } from 'react';
import { MdClose } from 'react-icons/md';

import { gql, useQuery } from '@apollo/client';

import { SpecialOfferDocument } from './SpecialOffer.generated';

const Close: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="absolute h-6 right-2 top-2 md:top-1/2 md:transform md:-translate-y-1/2 cursor-pointer hover:opacity-75 transition-opacity">
      <MdClose size={24} onClick={onClick} />
    </div>
  );
};

const LOCAL_STORAGE_KEY = 'specialOfferClosedTimestamp';

export const SpecialOffer: React.FC = () => {
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
    <div className="relative md:fixed md:bottom-0 w-full bg-primary-500 text-white px-10 py-3 z-10">
      <div className="flex flex-col justify-center items-center space-y-2 md:flex-row md:space-y-0 md:space-x-3">
        <div className="text-xs md:text-sm text-center font-bold">
          {specialOffer.text}
        </div>
        <a
          className="px-5 py-1.5 rounded-full bg-white text-primary-500 no-underline font-bold text-sm uppercase"
          href={specialOffer.link}
        >
          {specialOffer.button_text}
        </a>
      </div>
      <Close onClick={onClose} />
    </div>
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
