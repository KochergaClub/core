import styled from 'styled-components';

import { useDropzone } from 'react-dropzone';

const PreviewImg = styled.img`
  max-width: 236px;
  max-height: auto;
  cursor: pointer;
  font-size: 0.7rem;
`;

export const ImagePreview = ({ url }: { url: string }) => (
  <a target="_blank" href={url} download>
    <PreviewImg src={url} alt="Превью картинки" />
  </a>
);

interface Props {
  onDrop: (accepted: File[]) => void;
  url?: string;
}

const Placeholder = styled.div`
  font-size: 0.7rem;
`;

const Container = styled.div`
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

  .ImageDropzone a {
    line-height: 0;
  }

  .ImageDropzone_active {
    border-style: solid;
    border-color: #6c6;
    background-color: #eee;
  }

  .ImageDropzone_reject {
    border-style: solid;
    border-color: #c66;
    background-color: #eee;
  }

  .ImageDropzone_disabled {
    opacity: 0.5;
  }
`;

const ImageDropzone = ({ onDrop, url }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      {url ? (
        <ImagePreview url={url || ''} />
      ) : (
        <Placeholder>Сюда можно бросить файл</Placeholder>
      )}
    </Container>
  );

  //test
  //  return (
  //    <Container>
  //    <Dropzone
  //    multiple={false}
  //    accept="image/*"
  //        className="ImageDropzone"
  //        activeClassName="ImageDropzone_active"
  //        acceptClassName="ImageDropzone_accept"
  //        rejectClassName="ImageDropzone_reject"
  //        disabledClassName="ImageDropzone_disabled"
  //      >
  //        {() =>
  //          url !== undefined ? (
  //            <ImagePreview url={url} />
  //          ) : (
  //            <Placeholder>Сюда можно бросить файл</Placeholder>
  //          )
  //        }
  //      </Dropzone>
  //    </Container>
  //  );
};

export default ImageDropzone;
