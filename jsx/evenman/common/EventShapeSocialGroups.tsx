import React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

import EventShape from '../stores/EventShape';

import { ReactSelectCreatable } from '../components/ui';

interface Props {
  event: EventShape;
  type: 'vk' | 'fb';
}

@observer
export default class EventSocialGroups extends React.Component<Props> {
  @computed
  get toolsStore() {
    return this.props.event.apiStore.rootStore.announcementToolsStore;
  }

  render() {
    const { event, type } = this.props;

    const { getField, setField, placeholder } = {
      vk: {
        getField: (event: EventShape) => event.getVkGroup,
        setField: (event: EventShape, value: string | null) =>
          event.setVkGroup(value),
        placeholder: 'Выбрать ВК-группу',
      },
      fb: {
        getField: (event: EventShape) => event.getFbGroup,
        setField: (event: EventShape, value: string | null) =>
          event.setFbGroup(value),
        placeholder: 'Выбрать ФБ-группу',
      },
    }[type];

    const groups =
      type === 'vk' ? this.toolsStore.vkGroups : this.toolsStore.fbGroups;

    return groups.case({
      pending: () => (
        <ReactSelectCreatable placeholder={placeholder} isDisabled />
      ),
      rejected: () => (
        <ReactSelectCreatable placeholder="Ошибка загрузки" isDisabled />
      ),
      fulfilled: values => {
        const existingValue = getField(event);
        if (existingValue && values.indexOf(existingValue) === -1) {
          values.push(existingValue);
        }

        const value2option = (g: string | null | undefined) => {
          if (g === null || g === undefined || g === '') {
            return {
              value: '',
              label: 'Ø',
            };
          } else {
            return {
              value: g,
              label: g,
            };
          }
        };

        return (
          <ReactSelectCreatable
            placeholder={placeholder}
            options={values.map(g => value2option(g))}
            value={value2option(getField(event))}
            onChange={(option: any) => {
              setField(
                this.props.event,
                option ? (option.value as string) : null
              );
            }}
          />
        );
      },
    });
  }
}
