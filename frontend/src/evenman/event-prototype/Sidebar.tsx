import EventPrototypeAdd from './EventPrototypeAdd';
import EventPrototypeList from './EventPrototypeList';

interface Props {
  selected_id?: string;
}

const Sidebar: React.FC<Props> = ({ selected_id }) => {
  return (
    <div className="h-full overflow-auto w-72">
      <div className="p-4 pb-3 flex flex-col">
        <EventPrototypeAdd />
      </div>
      <EventPrototypeList selectedId={selected_id} />
    </div>
  );
};

export default Sidebar;
