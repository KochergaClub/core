import { RatioExerciseBlockFragment as Props } from './fragments.generated';
import styles from './styles.module.css';

export default function RatioExerciseBlock(block: Props) {
  const listContent = (
    <>
      {Array.from(new Array(block.exercise.lines_count)).map((_, i) => (
        <li className="w-full border-b text-gray-300" key={i}>
          &nbsp;
        </li>
      ))}
    </>
  );

  const list = block.exercise.enumerate ? (
    <ol className="ml-8">{listContent}</ol>
  ) : (
    <ul className="ml-8 list-none">{listContent}</ul>
  );

  return (
    <div style={{ pageBreakInside: 'avoid' }}>
      <div className={styles['exercise-header']}>{block.exercise.header}</div>
      {list}
    </div>
  );
}
