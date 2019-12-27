import * as React from 'react';
import { observer } from 'mobx-react';

import ImageDropzone from '../ImageDropzone';
import { Event, EventImageType } from '../stores/Event';

interface Props {
  event: Event;
  imageType: EventImageType;
}

@observer
export class EventImageDropzone extends React.Component<Props> {
  render() {
    const { event, imageType } = this.props;
    const onDrop = (acceptedFiles: File[]) => {
      console.log(acceptedFiles);
      event.uploadImage(acceptedFiles[0], imageType);
    };

    return <ImageDropzone onDrop={onDrop} url={event.getImage(imageType)} />;
  }
}
