import Select from 'react-select';
import { ActionMeta } from 'react-select/src/types';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';

import { EvenmanProjectsListDocument } from './queries.generated';

type OptionType = {
  value: string;
  label: string;
};

type Props = {
  selected?: string;
  select: (slug: string) => Promise<unknown>;
};

const EventShapeProjectLink = ({ selected, select }: Props) => {
  const projectsResult = useQuery(EvenmanProjectsListDocument);

  return (
    <ApolloQueryResults {...projectsResult}>
      {({ data: { projects } }) => {
        const options = projects.map((p) => ({
          value: p.meta.slug,
          label: p.meta.slug,
        }));

        const currentProject = options.find((p) => p.value === selected);

        const pickProject = async (
          v: OptionType | null,
          { action }: ActionMeta<OptionType>
        ) => {
          if (action === 'clear' || v === null) {
            await select('');
          } else {
            await select(v.value);
          }
        };

        return (
          <div>
            <Select
              value={currentProject || null}
              options={options}
              noOptionsMessage={() => 'Нет проектов'}
              placeholder="Выбрать..."
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
