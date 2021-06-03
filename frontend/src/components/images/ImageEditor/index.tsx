import clsx from 'clsx';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { useHover } from '~/common/hooks';

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
