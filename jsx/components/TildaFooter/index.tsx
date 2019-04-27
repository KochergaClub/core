import React from 'react';

import styled from 'styled-components';

import { Column } from '@kocherga/frontkit';

import Part from './Part';
import PartLinks from './PartLinks';
import Mailchimp from './Mailchimp';
import SocialIcons from '../TildaMenu/SocialIcons';
import { footerParts } from './constants';

const Footer = styled.footer`
  background-color: #111111;
  padding: 80px 60px;
`;

const Parts = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Copyright = styled.small`
  font-size: 0.7em;
  color: #555;
  max-width: 300px;
`;

const TildaFooter = () => {
  return (
    <Footer>
      <Parts>
        {footerParts.map((part, i) => (
          <Part title={part.title} key={i}>
            <PartLinks items={part.items} />
          </Part>
        ))}
        <Part title="Подпишитесь">
          <Column gutter={16}>
            {false && <Mailchimp />}
            <SocialIcons />
          </Column>
        </Part>
      </Parts>
      <Copyright>© 2015–2019 Центр прикладной рациональности Кочерга</Copyright>
    </Footer>
  );
};

export default TildaFooter;
