import React from 'react';

import styled from 'styled-components';

import { RichText } from '@kocherga/frontkit';

import { Project } from '../utils';

import TL02 from '~/blocks/TL02';

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

interface Props {
  project: Project;
}

const ProjectDetails: React.FC<Props> = ({ project }) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default ProjectDetails;
