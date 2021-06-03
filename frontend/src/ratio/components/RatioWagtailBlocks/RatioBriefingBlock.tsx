import { RatioBriefingBlockFragment as Props } from './fragments.generated';
import styles from './styles.module.css';

export default function RatioBriefingBlock(block: Props) {
  return (
    <div>
      <div
        className={styles.briefing}
        dangerouslySetInnerHTML={{ __html: block.value }}
      />
    </div>
  );
}
