import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import Page from '../components/Page';
import PageTitle from '../components/PageTitle';

import { Project, getProject } from './utils';

interface Props {
  slug: string;
}

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Summary = styled.div`
  margin-top: 20px;
  text-align: center;
`;

export default (props: Props) => {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    getProject(props.slug).then(setProject);
  }, []);

  if (!project) {
    return (
      <Page title="Загружается... | Проект Кочерги">
        <PageTitle>Загружается...</PageTitle>
      </Page>
    );
  }

  return (
    <Page title={`${project.title} | Проект Кочерги`}>
      <PageTitle>{project.title}</PageTitle>
      <Image src={project.image.url} />
      <Summary>{project.summary}</Summary>
    </Page>
  );
};
