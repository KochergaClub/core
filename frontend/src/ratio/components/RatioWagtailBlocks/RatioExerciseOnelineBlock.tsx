import styled from 'styled-components';

import { Row } from '@kocherga/frontkit';

import { RatioExerciseOnelineBlockFragment as Props } from './fragments.generated';

const Text = styled.div`
  color: hsl(21, 72%, 44%);
  font-size: 1.2em;
  font-style: italic;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Value = styled.div`
  border-bottom: 1px solid #888;
  flex: 1;
`;

export default function RatioExerciseOnelineBlock(block: Props) {
  return (
    <Row stretch>
      <Text>{block.exercise_oneline.text}:</Text>
      <Value />
    </Row>
  );
}
