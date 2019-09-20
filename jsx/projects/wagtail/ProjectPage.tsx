import React from 'react';

import styled from 'styled-components';

import { RichText } from '@kocherga/frontkit';

import Page from '~/components/Page';
import TL02 from '~/blocks/TL02';

import { NextWagtailPage } from '~/wagtail/types';

import { ProjectPageType } from '../utils';

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

const ProjectDetails: NextWagtailPage<ProjectPageType> = ({
  wagtailPage: project,
}) => {
  return (
    <Page
      title={project.title}
      og={{ image: project.image.url }}
      description={project.summary}
    >
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

export default ProjectDetails;
