import styled from 'styled-components';

interface Props {
  title: string;
}

const Header = styled.header`
  text-transform: uppercase;
  color: #525252;
  letter-spacing: 1px;
  margin-bottom: 8px;
  font-weight: 600;
`;

const FooterGroup: React.FC<Props> = ({ title, children }) => {
  return (
    <div>
      <Header>{title}</Header>
      {children}
    </div>
  );
};

export default FooterGroup;
