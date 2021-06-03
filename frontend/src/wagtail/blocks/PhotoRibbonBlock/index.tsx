import { gql } from '@apollo/client';

import { BlockComponent } from '../../types';
import { PhotoRibbonBlockFragment as Props } from './index.generated';

const PhotoRibbonBlock: BlockComponent<Props> = (props) => {
  return (
    <div className="flex overflow-hidden">
      {props.photos.map((photo, i) => (
        <img key={i} src={photo.url} className="h-40 object-cover" />
      ))}
    </div>
  );
};

// TODO - retina
PhotoRibbonBlock.fragment = gql`
  fragment PhotoRibbonBlock on PhotoRibbonBlock {
    id
    photos: value(spec: "min-400x320") {
      id
      url
    }
  }
`;

export default PhotoRibbonBlock;
