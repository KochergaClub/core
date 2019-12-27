import React from 'react';
import { observer } from 'mobx-react-lite';

import { Label } from '@kocherga/frontkit';

import EventShape from '../stores/EventShape';

import Select from 'react-select';
import { ActionTypes } from 'react-select/src/types';

interface Props {
  event: EventShape;
}

const EventShapeProjectLink = observer(({ event }: Props) => {
  const toolsStore = event.root.announcementToolsStore;
  const projectsPromise = toolsStore.projectSlugs;

  return projectsPromise.case({
    pending: () => <Label>Проекты загружаются...</Label>,
    rejected: () => <Label>Не удалось загрузить проекты</Label>,
    fulfilled: projects => {
      const options = projects.map(p => ({ value: p, label: p }));

      const currentProject = options.find(p => p.value === event.project_slug);

      const pickProject = async (
        v: any,
        { action }: { action: ActionTypes }
      ) => {
        if (action === 'clear') {
          event.setProjectSlug('');
        } else {
          event.setProjectSlug(v.value);
        }
      };

      return (
        <div>
          <Label>Проект:</Label>
          <Select
            value={currentProject || null}
            options={options}
            isClearable={true}
            onChange={pickProject}
          />
        </div>
      );
    },
  });
});

export default EventShapeProjectLink;
