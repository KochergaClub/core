import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { Row } from '@kocherga/frontkit';

import ImageDropzone from '../../ImageDropzone';

import EventPrototype from '../../stores/EventPrototype';
interface Props {
  prototype: EventPrototype;
}

const Image: React.FC<Props> = observer(({ prototype }) => {
  const onDrop = (acceptedFiles: File[]) => {
    prototype.uploadImage(acceptedFiles[0]);
  };

  return (
    <Row centered>
      <ImageDropzone onDrop={onDrop} url={prototype.image} />
    </Row>
  );
});

export default Image;
