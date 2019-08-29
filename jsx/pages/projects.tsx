import React from 'react';

import { NextPage } from '~/common/types';
import { selectAPI } from '~/core/selectors';

import Page from '~/components/Page';
import WorkInProgress from '~/components/WorkInProgress';

import ProjectIndex from '~/projects/components/ProjectIndex';

import { Project, getAllProjects } from '~/projects/utils';

interface Props {
  projects: Project[];
}

const ProjectsIndexPage: NextPage<Props> = (props: Props) => {
  return (
    <Page title="Проекты Кочерги">
      <ProjectIndex projects={props.projects} />
    </Page>
  );
};

ProjectsIndexPage.getInitialProps = async ({ store: { getState } }) => {
  const api = selectAPI(getState());

  return {
    projects: await getAllProjects(api),
  };
};

export default ProjectsIndexPage;
