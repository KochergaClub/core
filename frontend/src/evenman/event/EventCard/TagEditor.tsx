import EventShapeTags from '../../common/EventShapeTags';

import {
  EvenmanEvent_DetailsFragment,
  useEvenmanEventAddTagMutation,
  useEvenmanEventDeleteTagMutation,
} from '../queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const TagEditor: React.FC<Props> = ({ event }) => {
  const [addTag] = useEvenmanEventAddTagMutation();
  const [deleteTag] = useEvenmanEventDeleteTagMutation();

  return (
    <EventShapeTags
      tags={event.tags}
      addTag={value => addTag({ variables: { tag: value, id: event.id } })}
      deleteTag={value =>
        deleteTag({ variables: { tag: value, id: event.id } })
      }
    />
  );
};

export default TagEditor;
