import { observer } from 'mobx-react-lite';

import ImageDropzone from '../ImageDropzone';
import { Event, EventImageType } from '../stores/Event';

interface Props {
  event: Event;
  imageType: EventImageType;
}

const EventImageDropzone = observer((props: Props) => {
  const { event, imageType } = props;
  const onDrop = (acceptedFiles: File[]) => {
    event.uploadImage(acceptedFiles[0], imageType);
  };

  return <ImageDropzone onDrop={onDrop} url={event.getImage(imageType)} />;
});

export default EventImageDropzone;
