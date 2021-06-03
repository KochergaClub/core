import { gql } from '@apollo/client';

import { SocialIcons } from '~/components/Page/PageMenu/SocialIcons';
import { kochergaConfig } from '~/config';

import { BlockComponent } from '../../types';
import { BigContactsBlockFragment as Props } from './index.generated';

const BigText: React.FC = ({ children }) => (
  <div className="text-2xl">{children}</div>
);

const Link: React.FC<{ href: string }> = ({ href, children }) => (
  <a className="no-underline text-accent-500" href={href}>
    {children}
  </a>
);

const KEY = kochergaConfig.googleMapsKey;

const BigContactsBlock: BlockComponent<Props> = (props) => {
  return (
    <div className="flex flex-col md:h-screen md:flex-row">
      <iframe
        className="flex-1 min-h-80"
        src={`https://www.google.com/maps/embed/v1/view?center=${props.contacts.map.lat},${props.contacts.map.lng}&zoom=16&key=${KEY}`}
        allowFullScreen
      />
      <div className="flex-1 py-10 bg-black text-white flex justify-center items-center">
        <div className="max-w-md">
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
          <div className="my-8">{props.contacts.text}</div>
          <SocialIcons />
        </div>
      </div>
    </div>
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
