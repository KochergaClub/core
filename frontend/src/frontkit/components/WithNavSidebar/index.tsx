import styled from 'styled-components';

import * as colors from '../../colors';
import * as fonts from '../../fonts';
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
  display: block;
  color: ${colors.grey[700]};
  font-size: ${fonts.sizes.N};
  font-weight: bolder;
  padding: 10px 20px;
  min-width: 180px;

  text-decoration: none;
  border-bottom: 1px solid ${colors.grey[300]};
  &:hover {
    color: ${colors.primary[500]};
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
      <div>
        <header>
          <LogoLink
            href={header.href}
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault();
              selectTab(header.tabName);
            }}
          >
            {header.title}
          </LogoLink>
        </header>
        <MainNav {...props} />
      </div>
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
