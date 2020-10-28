import styled from 'styled-components';

import { Column } from '../../layout/Column';
import { ColumnNav } from '../ColumnNav';
import { WithSmartSidebar } from '../WithSmartSidebar';

interface Props {
  tabs: {
    title: string;
    name: string;
  }[];

  header: {
    title: string;
    tabName: string;
    href: string;
  };

  selected: string;
  selectTab: (name: string) => void;
  renderTab: (name: string) => React.ReactNode;
}

const LogoLink = styled.a`
  color: black;
  font-size: 24px;
  padding: 0 10px;

  text-decoration: none;
  &:hover {
    color: black;
    text-decoration: underline;
  }
`;

const MainNav: React.FC<Props> = ({ selected, selectTab, tabs }) => {
  return (
    <ColumnNav>
      {tabs.map(({ title, name }) => (
        <ColumnNav.Item
          key={name}
          selected={name === selected}
          select={() => selectTab(name)}
        >
          {title}
        </ColumnNav.Item>
      ))}
    </ColumnNav>
  );
};

const Sidebar: React.FC<Props> = (props) => {
  const { selectTab, header } = props;
  return (
    <Column stretch spaced>
      <Column stretch>
        <header>
          <LogoLink
            href={header.href}
            onClick={() => selectTab(header.tabName)}
          >
            {header.title}
          </LogoLink>
        </header>
        <MainNav {...props} />
      </Column>
    </Column>
  );
};

export const WithNavSidebar: React.FC<Props> = (props) => {
  const { selected, renderTab } = props;

  return (
    <WithSmartSidebar
      renderSidebar={() => <Sidebar {...props} />}
      renderContent={() => renderTab(selected)}
    />
  );
};
