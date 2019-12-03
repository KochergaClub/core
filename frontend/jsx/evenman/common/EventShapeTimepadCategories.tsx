import React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

import { ReactSelect } from '../components/ui';

import EventShape from '../stores/EventShape';
import { TimepadCategory } from '../stores/AnnouncementToolsStore';

interface Props {
  event: EventShape;
}

@observer
export default class EventShapeTimepadCategories extends React.Component<
  Props
> {
  @computed
  get toolsStore() {
    return this.props.event.root.announcementToolsStore;
  }

  category2option(category: TimepadCategory) {
    return {
      value: category.code,
      label: category.name,
    };
  }

  render() {
    return this.toolsStore.timepadCategories.case({
      pending: () => (
        <ReactSelect placeholder="Указать timepad-категорию" isDisabled />
      ),
      rejected: () => <ReactSelect placeholder="Ошибка загрузки" isDisabled />,
      fulfilled: value => {
        const selectedCategory = value.find(
          el => el.code === this.props.event.getTimepadCategoryCode
        );
        return (
          <ReactSelect
            placeholder="Указать timepad-категорию"
            options={value.map(this.category2option)}
            value={
              selectedCategory ? this.category2option(selectedCategory) : null
            }
            onChange={(option: any) =>
              this.props.event.setTimepadCategoryCode(option.value as string)
            }
          />
        );
      },
    });
  }
}
