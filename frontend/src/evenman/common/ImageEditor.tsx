import { useAPI } from '~/common/hooks';

import ImageDropzone from '../ImageDropzone';

interface WagtailImage {
  url: string;
}

interface Props {
  image?: WagtailImage;
  onChange: (id: string) => void;
}

const ImageEditor: React.FC<Props> = ({ image, onChange }) => {
  const api = useAPI();

  const onDrop = async (acceptedFiles: File[]) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('title', 'UNTITLED'); // TODO - ask for title

    const result = await api.call('wagtail/upload_image', 'POST', formData, {
      stringifyPayload: false,
    });
    const image_id = result.id;
    return onChange(image_id);
  };

  return <ImageDropzone onDrop={onDrop} url={image?.url} />;
};

export default ImageEditor;
