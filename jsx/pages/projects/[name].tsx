import React from 'react';

import styled from 'styled-components';

import { RichText } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';
import { selectAPI } from '~/core/selectors';

import TL02 from '~/blocks/TL02';

import { Project, getProject } from '~/projects/utils';

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

const ProjectsDetailPage: NextPage<Props> = ({ project }) => {
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

ProjectsDetailPage.getInitialProps = async ({ store: { getState }, query }) => {
  const api = selectAPI(getState());
  return { project: await getProject(query.name as string, api) };
};

export default ProjectsDetailPage;
