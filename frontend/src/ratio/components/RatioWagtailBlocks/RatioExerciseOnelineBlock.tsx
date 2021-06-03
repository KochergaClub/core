import { Row } from '~/frontkit';

import { RatioExerciseOnelineBlockFragment as Props } from './fragments.generated';
import styles from './styles.module.css';

export default function RatioExerciseOnelineBlock(block: Props) {
  return (
    <Row stretch>
      <div className={styles['exercise-header']}>
        {block.exercise_oneline.text}:
      </div>
      <div className="border-b border-gray-500" />
    </Row>
  );
}
