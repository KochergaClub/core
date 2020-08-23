import { FaExternalLinkAlt } from 'react-icons/fa';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const ExternalLink = styled.a`
  position: absolute;
  right: 5px;
  top: 5px;
  color: white;
`;

const PreviewImg = styled.img`
  max-width: 236px;
  max-height: auto;
  display: block;
  font-size: 0.7rem;
`;

interface Props {
  url: string;
  link?: string; // if not specified, link to download
}

export const ImagePreview: React.FC<Props> = ({ url, link }) => (
  <Container>
    <PreviewImg src={url} alt="Превью картинки" />

    <ExternalLink href={link || url}>
      <FaExternalLinkAlt />
    </ExternalLink>
  </Container>
);

export default ImagePreview;
