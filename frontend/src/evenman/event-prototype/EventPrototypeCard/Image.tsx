import { Row } from '@kocherga/frontkit';

import ImageDropzone from '../../ImageDropzone';

import {
  EventsPrototypeFragment,
  useEvenmanPrototypeUploadImageMutation,
} from '../queries.generated';
interface Props {
  prototype: EventsPrototypeFragment;
}

const Image: React.FC<Props> = ({ prototype }) => {
  const [uploadImage] = useEvenmanPrototypeUploadImageMutation();

  const onDrop = (acceptedFiles: File[]) => {
    uploadImage({
      variables: {
        id: prototype.id,
        image_file: acceptedFiles[0],
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
