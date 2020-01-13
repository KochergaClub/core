import styled from 'styled-components';

import { PhotoRibbonBlockFragment as Props } from '../fragments.generated';

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

export default function PhotoRibbonBlock(props: Props) {
  return (
    <Container>
      {props.photos.map((photo, i) => (
        <Image key={i} src={photo.url} />
      ))}
    </Container>
  );
}
