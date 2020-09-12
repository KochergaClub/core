import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import { useAPI } from '~/common/hooks';

import ImageBox from '../helpers/ImageBox';
import ViewOverlay from '../helpers/ViewOverlay';
import Controls from './Controls';
import { WagtailImage_ForEditorFragment as ImageFragment } from './fragments.generated';
import { Defaults } from './types';

const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 240px;
  min-height: 50px;
  background-color: #f8f8f8;
  font-size: 0.7rem;
`;

const Container = styled.div<{ active: boolean }>`
  position: relative; /* important for inner z-index elements, e.g. dropdowns */
  border-width: 2px;
  border-color: #666;
  border-style: dashed;
  border-radius: 5px;

  ${(props) =>
    props.active
      ? `
      border-style: solid;
      border-color: #6c6;
      background-color: #eee;
    `
      : ''}
`;

const ControlsContainer = styled.div`
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1; /* transform creates a new stacking context, so this is necessary for inner Dropdown */
`;

// via https://gist.github.com/gragland/a32d08580b7e0604ff02cb069826ca2f
const useHover = (): [(node: HTMLDivElement) => void, boolean] => {
  const [value, setValue] = useState(false);

  // Wrap in useCallback so we can use in dependencies below
  const handleMouseEnter = useCallback(() => setValue(true), []);
  const handleMouseLeave = useCallback(() => setValue(false), []);

  // Keep track of the last node passed to callbackRef
  // so we can remove its event listeners.
  const ref = useRef<HTMLDivElement>();

  // Use a callback ref instead of useEffect so that event listeners
  // get changed in the case that the returned ref gets added to
  // a different element later. With useEffect, changes to ref.current
  // wouldn't cause a rerender and thus the effect would run again.
  const callbackRef = useCallback(
    (node: HTMLDivElement) => {
      if (ref.current) {
        ref.current.removeEventListener('mouseenter', handleMouseEnter);
        ref.current.removeEventListener('mouseleave', handleMouseLeave);
      }

      ref.current = node;

      if (ref.current) {
        ref.current.addEventListener('mouseenter', handleMouseEnter);
        ref.current.addEventListener('mouseleave', handleMouseLeave);
      }
    },
    [handleMouseEnter, handleMouseLeave]
  );

  return [callbackRef, value];
};

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
    formData.append('title', defaults?.title || 'UNTITLED'); // TODO - ask for title
    // TODO - pass basename

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

  const [hoverRef, isHovered] = useHover();

  const [controlsExpanded, setControlsExpanded] = useState(false);

  const showControls = isHovered || controlsExpanded;

  return (
    <Container {...getRootProps()} active={isDragActive} ref={hoverRef}>
      <ImageBox
        src={image?.rendition.url}
        empty={() => <Placeholder>Сюда можно бросить файл</Placeholder>}
        displayOverlay={showControls}
      >
        {image && <ViewOverlay link={`/wagtail/images/${image.id}/`} />}
        <input {...getInputProps()} />
        <ControlsContainer className="controls-container">
          <Controls
            openFilePicker={open}
            setImageId={onChange}
            defaults={defaults || {}}
            onExpandChange={setControlsExpanded}
          />
        </ControlsContainer>
      </ImageBox>
    </Container>
  );
};

export default ImageEditor;
