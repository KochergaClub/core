import React, { useReducer } from 'react';

import { AnyBlockFragment } from '../types';
import AnyBlock from './AnyBlock';
import EditBlockWrapper from './EditBlockWrapper';
import EditControls from './EditControls';
import { WagtailStreamFieldValidationErrorFragment } from './queries.generated';

interface Props {
  blocks: AnyBlockFragment[];
}

interface ContextShape {
  dispatch: (action: Action) => void;
}

export const EditBlocksContext = React.createContext<ContextShape>({
  dispatch: () => undefined,
});

type DeleteBlockAction = {
  type: 'DELETE_BLOCK';
  payload: string;
};

type SetValidationErrorAction = {
  type: 'SET_VALIDATION_ERROR';
  payload: WagtailStreamFieldValidationErrorFragment;
};

type Action = DeleteBlockAction | SetValidationErrorAction;

interface State {
  blocks: AnyBlockFragment[];
  validation_error?: WagtailStreamFieldValidationErrorFragment;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'DELETE_BLOCK':
      return {
        ...state,
        blocks: state.blocks.filter((block) => block.id !== action.payload),
        validation_error: undefined,
      };
    case 'SET_VALIDATION_ERROR':
      return {
        ...state,
        validation_error: action.payload,
      };
  }
};

const EditWagtailBlocks: React.FC<Props> = ({ blocks }) => {
  // copying blocks data since we're going to edit them on frontend
  const [state, dispatch] = useReducer(reducer, blocks, (blocks) => ({
    blocks: JSON.parse(JSON.stringify(blocks)),
  }));

  // TODO:
  // - [ ] request blocks structure from backend
  // - [x] make an editable copy of all blocks
  // - [x] set up a context for editing callbacks
  // - [ ] implement UPDATE_BLOCK action
  // - [ ] implement CREATE_BLOCK action
  return (
    <EditBlocksContext.Provider value={{ dispatch }}>
      <div>
        <EditControls blocks={state.blocks} />
        {state.blocks.map((block, i) => {
          const block_validation_error = state.validation_error?.block_errors.find(
            (e) => e.block_id === i
          );
          return (
            <EditBlockWrapper
              key={block.id}
              block={block}
              validation_error={block_validation_error}
            >
              <AnyBlock {...block} />
            </EditBlockWrapper>
          );
        })}
      </div>
    </EditBlocksContext.Provider>
  );
};

export default EditWagtailBlocks;
