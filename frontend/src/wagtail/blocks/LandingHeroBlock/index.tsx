import { gql } from '@apollo/client';

import { BlockComponent } from '../../types';
import { LandingHeroBlockFragment as Props } from './index.generated';

const LandingHeroBlock: BlockComponent<Props> = (props) => {
  return (
    <div
      className="bg-black px-5 sm:px-10 py-20 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${props.landing_hero.image.url}")`,
      }}
    >
      <h1 className="text-5xl text-white">{props.landing_hero.title}</h1>
      <div className="text-white">{props.landing_hero.text}</div>
    </div>
  );
};

LandingHeroBlock.fragment = gql`
  fragment LandingHeroBlock on LandingHeroBlock {
    id
    landing_hero: value {
      title
      text
      image(spec: "fill-1200x400") {
        id
        url
        original_image {
          id
        }
      }
    }
  }
`;

export default LandingHeroBlock;
