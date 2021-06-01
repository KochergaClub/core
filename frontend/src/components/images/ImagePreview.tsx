import { ImageBox } from './helpers/ImageBox';
import ViewOverlay from './helpers/ViewOverlay';

interface Props {
  url: string;
  url_x2: string;
  link?: string; // if not specified, link to download
}

const empty = () => <div>Нет картинки</div>;

export const ImagePreview: React.FC<Props> = ({ url, url_x2, link }) => (
  <ImageBox src={url} src_x2={url_x2} empty={empty}>
    <ViewOverlay link={link || url} />
  </ImageBox>
);

export default ImagePreview;
