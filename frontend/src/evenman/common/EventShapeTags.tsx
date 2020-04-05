import { ReactSelectCreatable } from '../components/ui';

interface Props {
  tags: string[];
  addTag: (value: string) => Promise<any>;
  deleteTag: (value: string) => Promise<any>;
}

interface OptionType {
  value: string;
  label: string;
}

const EventShapeTags: React.FC<Props> = ({ tags, addTag, deleteTag }) => {
  const value2option = (g: string) => {
    return {
      value: g,
      label: g,
    };
  };

  const allTags = ['ratio', 'feedback', 'slides', 'record'];

  return (
    <div>
      <ReactSelectCreatable
        placeholder="Добавить тег"
        options={allTags.map(value2option)}
        value={tags.map(value2option)}
        isMulti
        onChange={(options: any) => {
          const selectedTags = ((options || []) as OptionType[]).map(
            option => option.value
          );

          for (const selectedTag of selectedTags) {
            if (tags.indexOf(selectedTag) >= 0) {
              continue;
            }
            addTag(selectedTag);
          }
          for (const tag of tags) {
            if (selectedTags.indexOf(tag) >= 0) {
              continue;
            }
            deleteTag(tag);
          }
        }}
      />
    </div>
  );
};

export default EventShapeTags;
