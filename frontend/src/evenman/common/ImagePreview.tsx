import { FaExternalLinkAlt } from 'react-icons/fa';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;

  > .external-link {
    display: none;
  }
  &:hover {
    > .preview-img {
      filter: brightness(50%);
      transition: filter 0.3s;
    }
    > .external-link {
      display: block;
    }
  }
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
    <PreviewImg src={url} alt="Превью картинки" className="preview-img" />

    <ExternalLink href={link || url} className="external-link">
      <FaExternalLinkAlt />
    </ExternalLink>
  </Container>
);

export default ImagePreview;
