import styled from 'styled-components';

import { gql } from '@apollo/client';

import { BlockComponent } from '../../types';
import { PhotoRibbonBlockFragment as Props } from './index.generated';

const Container = styled.div`
  display: flex;
  overflow: hidden;
  height: 160px;
`;

const Image = styled.img`
  height: 160px;
  width: auto;
  object-fit: cover;
`;

const PhotoRibbonBlock: BlockComponent<Props> = (props) => {
  return (
    <Container>
      {props.photos.map((photo, i) => (
        <Image key={i} src={photo.url} />
      ))}
    </Container>
  );
};

PhotoRibbonBlock.fragment = gql`
  fragment PhotoRibbonBlock on PhotoRibbonBlock {
    id
    photos: value(spec: "min-400x320") {
      id
      url
    }
  }
`;

export default PhotoRibbonBlock;
