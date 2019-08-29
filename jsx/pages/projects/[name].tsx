import React from 'react';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';
import { selectAPI } from '~/core/selectors';

import { Project, getProject } from '~/projects/utils';
import ProjectDetails from '~/projects/components/ProjectDetails';

interface Props {
  project: Project;
}

const ProjectsDetailPage: NextPage<Props> = ({ project }) => {
  return (
    <Page title={`${project.title} | Проект Кочерги`}>
      <ProjectDetails project={project} />
    </Page>
  );
};

ProjectsDetailPage.getInitialProps = async ({ store: { getState }, query }) => {
  const api = selectAPI(getState());
  return { project: await getProject(query.name as string, api) };
};

export default ProjectsDetailPage;
