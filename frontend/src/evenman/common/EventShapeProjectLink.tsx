import Link from 'next/link';
import React from 'react';
import Select, { components, OptionProps } from 'react-select';
import { ActionMeta } from 'react-select/src/types';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import { A, Column } from '~/frontkit';

import { EvenmanProjectsListDocument, ProjectPage_ForPickerFragment } from './queries.generated';

type OptionType = ProjectPage_ForPickerFragment;

type Props = {
  selected?: string;
  select: (slug: string) => Promise<unknown>;
};

const Option: React.FC<OptionProps<OptionType, false>> = (props) => {
  return (
    <components.Option {...props}>
      <small>{props.data.meta.slug}</small>
      <br />
      {props.data.title}
    </components.Option>
  );
};

const EventShapeProjectLink: React.FC<Props> = ({ selected, select }) => {
  const projectsResult = useQuery(EvenmanProjectsListDocument);

  return (
    <ApolloQueryResults {...projectsResult}>
      {({ data: { projects } }) => {
        const options = projects;

        const currentProject = projects.find((p) => p.meta.slug === selected);

        const pickProject = async (
          v: OptionType | null,
          { action }: ActionMeta<OptionType>
        ) => {
          if (action === 'clear' || v === null) {
            await select('');
          } else {
            await select(v.meta.slug);
          }
        };

        return (
          <Column stretch>
            <Select
              value={currentProject || null}
              options={options}
              components={{
                Option,
              }}
              getOptionLabel={(p) => p.title}
              getOptionValue={(p) => p.meta.slug}
              noOptionsMessage={() => 'Нет проектов'}
              placeholder="Выбрать..."
              isClearable={true}
              onChange={pickProject}
            />
            {currentProject ? (
              <Link href={currentProject.meta.url} passHref>
                <A>
                  <small>Открыть страницу проекта</small>
                </A>
              </Link>
            ) : null}
          </Column>
        );
      }}
    </ApolloQueryResults>
  );
};

export default EventShapeProjectLink;
