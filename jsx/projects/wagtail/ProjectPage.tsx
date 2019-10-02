import React from 'react';

import styled from 'styled-components';

import Page from '~/components/Page';
import TL02 from '~/blocks/TL02';
import RichTextBlock from '~/blocks/RichTextBlock';

import { NextWagtailPage } from '~/wagtail/types';

import { ProjectPageType } from '../utils';

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
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
      <RichTextBlock html={project.body} />
    </Page>
  );
};

export default ProjectDetails;
