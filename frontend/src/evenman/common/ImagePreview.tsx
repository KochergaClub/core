import ImageBox from './images/ImageBox';
import ViewOverlay from './images/ViewOverlay';

interface Props {
  url: string;
  link?: string; // if not specified, link to download
}

const empty = () => <div>Нет картинки</div>;

export const ImagePreview: React.FC<Props> = ({ url, link }) => (
  <ImageBox src={url} empty={empty}>
    <ViewOverlay link={link || url} />
  </ImageBox>
);

export default ImagePreview;
