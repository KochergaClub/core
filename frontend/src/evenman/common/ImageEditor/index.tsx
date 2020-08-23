import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import { useAPI } from '~/common/hooks';

import ImagePreview from '../ImagePreview';
import Controls from './Controls';
import { WagtailImageRendition_ForEditorFragment as ImageFragment } from './fragments.generated';
import { Defaults } from './types';

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
  position: relative;

  ${(props) =>
    props.active
      ? `
      border-style: solid;
      border-color: #6c6;
      background-color: #eee;
    `
      : ''}

  > .controls-container {
    opacity: 0;
    transition: opacity 200ms;
  }

  &:hover {
    > .controls-container {
      opacity: 1;
      transition: opacity 200ms;
    }
  }
`;

const ControlsContainer = styled.div`
  position: absolute;
  bottom: 5px;
`;

interface Props {
  image?: ImageFragment;
  defaults?: Defaults; // some contexts might provide default title and basename (e.g. event images)
  onChange: (id: string) => Promise<unknown>;
}

const ImageEditor: React.FC<Props> = ({ image, onChange, defaults }) => {
  const api = useAPI();

  const onDrop = async (acceptedFiles: File[]) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('title', 'UNTITLED'); // TODO - ask for title

    const result = await api.call('wagtail/upload_image', 'POST', formData, {
      stringifyPayload: false,
    });
    const image_id = result.id;
    return onChange(image_id);
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <Container {...getRootProps()} active={isDragActive}>
      <input {...getInputProps()} />
      {image ? (
        <ImagePreview url={image.url || ''} link={image.original_image?.url} />
      ) : (
        <Placeholder>Сюда можно бросить файл</Placeholder>
      )}
      <ControlsContainer className="controls-container">
        <Controls
          openFilePicker={open}
          setImageId={onChange}
          defaults={defaults || {}}
        />
      </ControlsContainer>
    </Container>
  );
};

export default ImageEditor;
