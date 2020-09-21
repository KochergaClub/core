import { useMutation } from '@apollo/client';
import { Row } from '@kocherga/frontkit';

import ImageEditor from '~/components/images/ImageEditor';

import { EvenmanPrototypeSetImageDocument, EventsPrototypeFragment } from '../queries.generated';

interface Props {
  prototype: EventsPrototypeFragment;
}

const Image: React.FC<Props> = ({ prototype }) => {
  const [setImage] = useMutation(EvenmanPrototypeSetImageDocument);

  const onChange = async (image_id: string) => {
    await setImage({
      variables: {
        id: prototype.id,
        image_id,
      },
    });
  };

  return (
    <Row centered>
      <ImageEditor
        onChange={onChange}
        image={prototype.image?.original_image || undefined}
        defaults={{
          title: prototype.title,
          basename: `prototype-image-${prototype.id}`,
        }}
      />
    </Row>
  );
};

export default Image;
