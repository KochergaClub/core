import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import Page from '../components/Page';

import TL02 from '../blocks/TL02';

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
  font-size: 1.2rem;
  text-align: center;
`;

const Description = styled.div`
  margin: 0 auto;
  max-width: 800px;
  margin-bottom: 100px;
`;

export default (props: Props) => {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    getProject(props.slug).then(setProject);
  }, []);

  if (!project) {
    return <Page title="Загружается... | Проект Кочерги">&nbsp;</Page>;
  }

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
