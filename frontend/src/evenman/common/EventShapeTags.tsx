import * as React from 'react';
import { observer } from 'mobx-react';

import EventShape from '../stores/EventShape';

import {
  ReactSelectCreatable,
} from '../components/ui';

interface Props {
  event: EventShape;
}

interface OptionType {
  value: string;
  label: string;
}

@observer
export default class EventShapeTags extends React.Component<Props> {
  render() {
    const { event } = this.props;

    const value2option = (g: string) => {
      return {
        value: g,
        label: g,
      }
    };

    const allTags = ['ratio', 'feedback', 'slides', 'record'];

    return (
      <div>
        <ReactSelectCreatable
          placeholder='Добавить тег'
          options={
            allTags.map(value2option)
          }
          value={
            event.tags.map(value2option)
          }
          isMulti
          onChange={
            (options: any) => {
              const selectedTags = (options as OptionType[]).map(option => option.value);

              for (const selectedTag of selectedTags) {
                if (event.tags.indexOf(selectedTag) >= 0) {
                  continue;
                }
                event.addTag(selectedTag);
              }
              for (const tag of event.tags) {
                if (selectedTags.indexOf(tag) >= 0) {
                  continue;
                }
                event.deleteTag(tag);
              }
            }
          }
        />
      </div>
    );
  }
}
