import { useQuery } from '@apollo/client';

import { useExpandable } from '~/common/hooks';
import { Picker } from '~/components/Picker';

import { RatioTrainerFragment, RatioTrainersDocument } from '../../queries.generated';

interface Props {
  trainer_name?: string;
  picked: (name: RatioTrainerFragment) => Promise<void>;
  unpicked: () => Promise<void>;
}

const TrainerName: React.FC<{ name: string }> = ({ name }) => (
  <div>[{name}]</div>
);

const EmptyTrainerName = () => (
  <div className="print:hidden">[Выбрать тренера]</div>
);

export default function EditableTrainer({
  trainer_name,
  picked,
  unpicked,
}: Props) {
  const { expanded, unexpand, flipExpand, ref } = useExpandable();

  const queryResults = useQuery(RatioTrainersDocument);

  return (
    <div className="flex justify-center">
      <div className="relative cursor-pointer whitespace-nowrap" ref={ref}>
        <div onClick={flipExpand}>
          {trainer_name ? (
            <TrainerName name={trainer_name} />
          ) : (
            <EmptyTrainerName />
          )}
        </div>
        {expanded && (
          <Picker
            loading={queryResults.loading}
            items={queryResults.data ? queryResults.data.trainers : []}
            item2text={(maybeTrainer) =>
              maybeTrainer ? maybeTrainer.long_name : 'Очистить'
            }
            picked={async (t?: RatioTrainerFragment) => {
              if (t) {
                await picked(t);
              } else {
                await unpicked();
              }
              unexpand();
            }}
          />
        )}
      </div>
    </div>
  );
}
