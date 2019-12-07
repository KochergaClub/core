import { useSelector } from 'react-redux';

import styled from 'styled-components';

import Picker from '~/components/Picker';
import { useExpandable } from '~/common/hooks';

import { selectTrainers } from '~/ratio/features/trainers';
import { Trainer } from '~/ratio/types';

interface Props {
  trainer_name?: string;
  picked: (name: Trainer) => void;
  unpicked: () => void;
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

  const trainers = useSelector(selectTrainers);

  const items = (trainers as (Trainer | undefined)[]).concat([undefined]);

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
            items={items}
            item2text={maybeTrainer =>
              maybeTrainer ? maybeTrainer.long_name : 'Очистить'
            }
            picked={async (t?: Trainer) => {
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
