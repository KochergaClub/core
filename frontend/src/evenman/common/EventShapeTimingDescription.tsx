import EditableString from '../components/EditableString';
import { MutedSpan, UserSpan } from '../components/ui';

interface Props {
  value: string;
  setValue: (value: string) => Promise<unknown>;
}

const EventShapeTimingDescription: React.FC<Props> = ({ value, setValue }) => {
  const renderValue = () => {
    if (value) {
      return <UserSpan>{value}</UserSpan>;
    }
    return (
      <UserSpan>
        <MutedSpan>
          Встреча пройдёт в %день недели% %день% %месяца%, в %HH:MM%,
        </MutedSpan>
      </UserSpan>
    );
  };

  return (
    <EditableString value={value} renderValue={renderValue} save={setValue} />
  );
};

export default EventShapeTimingDescription;
