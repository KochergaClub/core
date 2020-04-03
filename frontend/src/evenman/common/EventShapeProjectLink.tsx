import Select from 'react-select';

import { Label } from '@kocherga/frontkit';

import { ApolloQueryResults } from '~/components';

import { ActionTypes } from 'react-select/src/types';

import { useEvenmanProjectsListQuery } from './queries.generated';

interface Props {
  selected?: string;
  select: (slug: string) => Promise<void>;
}

const EventShapeProjectLink = ({ selected, select }: Props) => {
  const projectsResult = useEvenmanProjectsListQuery();

  return (
    <ApolloQueryResults {...projectsResult}>
      {({ data: { projects } }) => {
        const options = projects.map(p => ({
          value: p.meta.slug,
          label: p.meta.slug,
        }));

        const currentProject = options.find(p => p.value === selected);

        const pickProject = async (
          v: any,
          { action }: { action: ActionTypes }
        ) => {
          if (action === 'clear') {
            await select('');
          } else {
            await select(v.value);
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
      }}
    </ApolloQueryResults>
  );
};

export default EventShapeProjectLink;
