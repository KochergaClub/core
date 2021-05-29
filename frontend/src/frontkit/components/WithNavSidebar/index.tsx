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
    <div>
      <header>
        <a
          className="block px-6 py-4 border-0 border-b border-solid border-gray-300 font-bold no-underline text-gray-600 hover:text-primary-500"
          href={header.href}
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault();
            selectTab(header.tabName);
          }}
        >
          {header.title}
        </a>
      </header>
      <MainNav {...props} />
    </div>
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
