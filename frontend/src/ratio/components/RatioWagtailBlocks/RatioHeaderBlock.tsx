import { RatioHeaderBlockFragment as Props } from './fragments.generated';
import styles from './styles.module.scss';

export default function RatioHeaderBlock(block: Props) {
  return <h1 className={styles.header}>{block.value}</h1>;
}
