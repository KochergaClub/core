import { RatioInsetBlockFragment as Props } from './fragments.generated';
import styles from './styles.module.css';

export default function RatioInsetBlock(block: Props) {
  return (
    <div
      className={styles.inset}
      dangerouslySetInnerHTML={{ __html: block.value }}
    />
  );
}
