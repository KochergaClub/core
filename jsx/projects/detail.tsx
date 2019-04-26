import React from 'react';

import styled from 'styled-components';

import Page from '../components/Page';
import PageTitle from '../components/PageTitle';

import { GET_PROJECT } from './constants';

interface Props {
  name: string;
}

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export default (props: Props) => {
  const project = GET_PROJECT(props.name);

  return (
    <Page title={`${project.title} | Проект Кочерги`}>
      <PageTitle>{project.title}</PageTitle>
      <Image src={project.image} />
      <div>{project.summary}</div>
    </Page>
  );
};
