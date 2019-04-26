import React from 'react';

import styled from 'styled-components';

import { Project } from '../utils';

const Link = styled.a`
  text-decoration: none;
  color: black;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  padding-bottom: 10px;
  min-width: 300px;
  max-width: 500px;
  height: 100%;
`;

const Inner = styled.div`
  padding: 20px;
  padding-top: 10px;
`;

const Header = styled.header`
  font-size: 1.3rem;
  line-height: 1.3;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Summary = styled.div`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #333;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProjectCard = (props: Project) => {
  return (
    <Link href={`/projects/${props.meta.slug}`}>
      <Card>
        <Image src={props.image_thumbnail.url} />
        <Inner>
          <Header>{props.title}</Header>
          <Summary>{props.summary}</Summary>
        </Inner>
      </Card>
    </Link>
  );
};

export default ProjectCard;
