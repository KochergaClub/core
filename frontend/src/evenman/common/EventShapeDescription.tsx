import { UserText, MutedSpan } from '../components/ui';

import EditableText from '../components/EditableText';

interface Props {
  summary: string;
  description: string;
  setSummary: (value: string) => Promise<any>;
  setDescription: (value: string) => Promise<any>;
}

const EventShapeDescription: React.FC<Props> = ({
  summary,
  description,
  setSummary,
  setDescription,
}) => {
  const empty = (
    <UserText>
      <MutedSpan>Нет описания.</MutedSpan>
    </UserText>
  );

  return (
    <div>
      <EditableText
        title="Короткое описание"
        text={summary}
        empty={empty}
        save={setSummary}
      />
      <EditableText
        title="Описание"
        text={description}
        empty={empty}
        save={setDescription}
      />
    </div>
  );
};

export default EventShapeDescription;
