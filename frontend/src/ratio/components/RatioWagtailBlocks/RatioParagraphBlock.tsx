import { RatioParagraphBlockFragment as Props } from './fragments.generated';
import styles from './styles.module.scss';

export default function RatioParagraphBlock(block: Props) {
  return (
    <div
      className={styles.paragraph}
      dangerouslySetInnerHTML={{ __html: block.value }}
    />
  );
}
