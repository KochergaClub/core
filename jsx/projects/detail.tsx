import React, { useState, useEffect, useContext } from 'react';

import styled from 'styled-components';

import Page from '../components/Page';
import GlobalContext from '../components/GlobalContext';

import TL02 from '../blocks/TL02';

import { Project } from './utils';

interface Props {
  project: Project;
}

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Description = styled.div`
  margin: 0 auto;
  max-width: 800px;
  margin-bottom: 100px;
`;

export default ({ project }: Props) => {
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
