import { Row } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';

import ImageDropzone from '../../ImageDropzone';

import {
  EventsPrototypeFragment,
  useEvenmanPrototypeSetImageMutation,
} from '../queries.generated';
interface Props {
  prototype: EventsPrototypeFragment;
}

const Image: React.FC<Props> = ({ prototype }) => {
  const api = useAPI();
  const [setImage] = useEvenmanPrototypeSetImageMutation();

  const onDrop = async (acceptedFiles: File[]) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('title', 'UNTITLED');

    const result = await api.call('wagtail/upload_image', 'POST', formData, {
      stringifyPayload: false,
    });
    const image_id = result.id;
    await setImage({
      variables: {
        id: prototype.id,
        image_id,
      },
    });
  };

  return (
    <Row centered>
      <ImageDropzone onDrop={onDrop} url={prototype.image?.url} />
    </Row>
  );
};

export default Image;
