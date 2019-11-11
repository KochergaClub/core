import styled from 'styled-components';

import { useDropzone } from 'react-dropzone';

const PreviewLink = styled.a`
  line-height: 0;
`;

const PreviewImg = styled.img`
  max-width: 236px;
  max-height: auto;
  cursor: pointer;
  font-size: 0.7rem;
`;

export const ImagePreview = ({ url }: { url: string }) => (
  <PreviewLink target="_blank" href={url} download>
    <PreviewImg src={url} alt="Превью картинки" />
  </PreviewLink>
);

interface Props {
  onDrop: (accepted: File[]) => void;
  url?: string;
}

const Placeholder = styled.div`
  font-size: 0.7rem;
`;

const Container = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  min-height: 50px;
  border-width: 2px;
  border-color: #666;
  border-style: dashed;
  border-radius: 5px;
  background-color: #f8f8f8;
  cursor: pointer;

  ${props =>
    props.active
      ? `
      border-style: solid;
      border-color: #6c6;
      background-color: #eee;
    `
      : ''}
`;

const ImageDropzone = ({ onDrop, url }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container {...getRootProps()} active={isDragActive}>
      <input {...getInputProps()} />
      {url ? (
        <ImagePreview url={url || ''} />
      ) : (
        <Placeholder>Сюда можно бросить файл</Placeholder>
      )}
    </Container>
  );
};

export default ImageDropzone;
