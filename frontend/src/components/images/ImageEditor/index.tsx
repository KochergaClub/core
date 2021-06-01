import clsx from 'clsx';
import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { ImageBox } from '../helpers/ImageBox';
import ViewOverlay from '../helpers/ViewOverlay';
import Controls from './Controls';
import { WagtailImage_ForEditorFragment as ImageFragment } from './fragments.generated';
import { Defaults } from './types';
import { UploadFromFileModal } from './UploadFromFileModal';

const Placeholder: React.FC = ({ children }) => (
  <div
    className="flex justify-center items-center bg-gray-100 text-xs"
    style={{ minWidth: 240, minHeight: 50 }} // FIXME
  >
    {children}
  </div>
);

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

export type Props = {
  image?: ImageFragment;
  defaults?: Defaults; // some contexts might provide default title and basename (e.g. event images)
  onChange: (id: string) => Promise<unknown>;
};

export const ImageEditor: React.FC<Props> = ({
  image,
  onChange,
  defaults = {},
}) => {
  const [dropFile, setDropFile] = useState<File | undefined>(undefined);

  const closeDropModal = () => {
    setDropFile(undefined);
  };

  const onDrop = async (acceptedFiles: File[]) => {
    setDropFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  const [hoverRef, isHovered] = useHover();

  const [controlsExpanded, setControlsExpanded] = useState(false);

  const showControls = isHovered || controlsExpanded;

  return (
    <div
      className={clsx(
        'relative' /* important for inner z-index elements, e.g. dropdowns */,
        'border-2 rounded',
        isDragActive ? 'border-primary-500' : 'border-dashed border-gray-500'
      )}
      {...getRootProps()}
      ref={hoverRef}
    >
      <ImageBox
        src={image?.rendition.url}
        src_x2={image?.rendition_x2.url}
        empty={() => <Placeholder>Сюда можно бросить файл</Placeholder>}
        displayOverlay={showControls}
      >
        {image && <ViewOverlay link={`/wagtail/images/${image.id}/`} />}
        <input {...getInputProps()} />
        <div
          className={clsx(
            'absolute bottom-1 left-1/2 transform -translate-x-1/2',
            'z-10' /* transform creates a new stacking context, so this is necessary for inner Dropdown */
          )}
        >
          <Controls
            openFilePicker={open}
            setImageId={onChange}
            defaults={defaults}
            onExpandChange={setControlsExpanded}
          />
        </div>
      </ImageBox>
      {dropFile && (
        <UploadFromFileModal
          file={dropFile}
          close={closeDropModal}
          onChange={onChange}
          defaults={defaults}
        />
      )}
    </div>
  );
};
