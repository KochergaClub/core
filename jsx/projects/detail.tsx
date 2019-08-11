import React from 'react';

import styled from 'styled-components';

import { RichText } from '@kocherga/frontkit';

import { Screen } from '~/common/types';
import Page from '~/components/Page';
import { selectAPI } from '~/core/selectors';

import TL02 from '../blocks/TL02';

import { Project, getProject } from './utils';
import { InitialLoader } from '../common/types';

interface Props {
  project: Project;
}

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Description = styled(RichText)`
  margin: 0 auto;
  max-width: 800px;
  margin-bottom: 100px;
`;

const ProjectsDetailPage = ({ project }: Props) => {
  return (
    <Page title={`${project.title} | Проект Кочерги`}>
      <TL02 title={project.title}>
        {project.summary}
        {project.activity_summary && (
          <div>
            <small>{project.activity_summary}</small>
          </div>
        )}
      </TL02>
      <Image src={project.image.url} />
      <Description dangerouslySetInnerHTML={{ __html: project.body }} />
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async (
  { getState },
  { params }
) => {
  const api = selectAPI(getState());
  return { project: await getProject(params.name, api) };
};

const screen: Screen<Props> = {
  component: ProjectsDetailPage,
  getInitialData,
};

export default screen;
