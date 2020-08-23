import { Row } from '@kocherga/frontkit';

import ImageEditor from '../../common/ImageEditor';
import { EventsPrototypeFragment, useEvenmanPrototypeSetImageMutation } from '../queries.generated';

interface Props {
  prototype: EventsPrototypeFragment;
}

const Image: React.FC<Props> = ({ prototype }) => {
  const [setImage] = useEvenmanPrototypeSetImageMutation();

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
      <ImageEditor onChange={onChange} image={prototype.image || undefined} />
    </Row>
  );
};

export default Image;
