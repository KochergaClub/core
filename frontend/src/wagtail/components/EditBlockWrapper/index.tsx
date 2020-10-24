import styled from 'styled-components';

import { colors } from '~/frontkit';

import { AnyBlockFragment } from '../../types';
import ControlledBlockContainer from '../ControlledBlockContainer';
import { WagtailStreamFieldValidationErrorFragment } from '../queries.generated';
import AddControls from './AddControls';
import Controls from './Controls';

type BlockValidationError = NonNullable<
  WagtailStreamFieldValidationErrorFragment['block_errors'][0]['error']
>;

interface Props {
  block: AnyBlockFragment;
  position?: number;
  total?: number;
  validation_error?: BlockValidationError;
}

const ValidationErrorContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: ${colors.accent[700]};
  color: black;
  /* color: ${colors.accent[700]}; */
  padding: 4px 8px;
`;

const ValidationError: React.FC<{
  error: BlockValidationError;
}> = ({ error }) => {
  return (
    <ValidationErrorContainer>{error.error_message}</ValidationErrorContainer>
  );
};

const EditBlockWrapper: React.FC<Props> = ({
  block,
  position,
  total,
  validation_error,
  children,
}) => {
  return (
    <ControlledBlockContainer
      controls={Controls}
      block={block}
      position={position}
      total={total}
    >
      {children}
      {validation_error ? <ValidationError error={validation_error} /> : null}
      {position !== undefined ? <AddControls position={position + 1} /> : null}
    </ControlledBlockContainer>
  );
};

export default EditBlockWrapper;
