import clsx from 'clsx';

import { gql } from '@apollo/client';

import { BlockComponent } from '../../types';
import { HeroButtons } from './HeroButtons';
import { HeroFrontBlockFragment as Props } from './index.generated';
import styles from './index.module.css';

const HeroFrontBlock: BlockComponent<Props> = (props) => {
  return (
    <div className={clsx('flex items-center p-10 sm:p-16', styles.background)}>
      <div className="max-w-screen-sm flex flex-col justify-between">
        <h1 className={styles.header}>{props.hero.title}</h1>
        <HeroButtons buttons={props.hero.buttons} />
      </div>
    </div>
  );
};

HeroFrontBlock.fragment = gql`
  fragment HeroFrontBlock on HeroFrontBlock {
    id
    hero: value {
      title
      buttons {
        title
        link
        highlight
      }
    }
  }
`;

export default HeroFrontBlock;
