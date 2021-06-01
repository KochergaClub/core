import styled from 'styled-components';

import { useQuery } from '@apollo/client';

import { useExpandable } from '~/common/hooks';
import { Picker } from '~/components/Picker';

import { RatioTrainerFragment, RatioTrainersDocument } from '../../queries.generated';

interface Props {
  trainer_name?: string;
  picked: (name: RatioTrainerFragment) => Promise<void>;
  unpicked: () => Promise<void>;
}

const OuterContainer = styled.div`
  justify-content: center;
  display: flex;
`;

const Container = styled.div`
  position: relative;
  cursor: pointer;
  white-space: nowrap;
`;

const NonPrintableDiv = styled.div`
  @media print {
    display: none;
  }
`;

const TrainerName = ({ name }: { name: string }) => <div>[{name}]</div>;

const EmptyTrainerName = () => (
  <NonPrintableDiv>[Выбрать тренера]</NonPrintableDiv>
);

export default function EditableTrainer({
  trainer_name,
  picked,
  unpicked,
}: Props) {
  const { expanded, unexpand, flipExpand, ref } = useExpandable();

  const queryResults = useQuery(RatioTrainersDocument);

  return (
    <OuterContainer>
      <Container ref={ref}>
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
            item2text={maybeTrainer =>
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
      </Container>
    </OuterContainer>
  );
}
