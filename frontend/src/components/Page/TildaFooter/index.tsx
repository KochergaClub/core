import styled from 'styled-components';

import { Column } from '@kocherga/frontkit';

import FooterGroup from './FooterGroup';
import PartLinks from './PartLinks';
import Mailchimp from './Mailchimp';
import SocialIcons from '../TildaMenu/SocialIcons';
import { footerParts } from './constants';

const Footer = styled.footer`
  background-color: #111111;
  padding: 40px 60px;

  @media print {
    display: none;
  }
`;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 40px;

  > * {
    margin-top: 40px;
    margin-right: 20px;
  }
  > *:last-child {
    margin-right: 0;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;

    > * {
      margin: 0;
      margin-bottom: 40px;
    }
  }
`;

const Copyright = styled.small`
  font-size: 0.7em;
  color: #555;
  max-width: 300px;
`;

const GroupContainer = styled.div`
  flex: 1;
`;

const WrappedGroup: React.FC<{ title: string }> = ({ title, children }) => (
  <GroupContainer>
    <FooterGroup title={title}>{children}</FooterGroup>
  </GroupContainer>
);

const TildaFooter = () => {
  return (
    <Footer>
      <Layout>
        {footerParts.map((part, i) => (
          <WrappedGroup title={part.title} key={i}>
            <PartLinks items={part.items} />
          </WrappedGroup>
        ))}
        <WrappedGroup title="Подпишитесь">
          <Column gutter={16}>
            {false && <Mailchimp />}
            <SocialIcons />
          </Column>
        </WrappedGroup>
      </Layout>
      <Copyright>© 2015–2020 Центр рациональности Кочерга</Copyright>
    </Footer>
  );
};

export default TildaFooter;
