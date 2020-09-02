import React, { useReducer } from 'react';
import FlipMove from 'react-flip-move';

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

type EditBlockAction = {
  type: 'EDIT_BLOCK';
  payload: AnyBlockFragment;
};

type SwapBlocksAction = {
  type: 'SWAP_BLOCKS';
  payload: {
    first: number;
    second: number;
  };
};

type SetValidationErrorAction = {
  type: 'SET_VALIDATION_ERROR';
  payload: WagtailStreamFieldValidationErrorFragment;
};

type Action =
  | DeleteBlockAction
  | EditBlockAction
  | SwapBlocksAction
  | SetValidationErrorAction;

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
    case 'EDIT_BLOCK':
      return {
        ...state,
        blocks: state.blocks.map((block) => {
          if (block.id !== action.payload.id) {
            return block;
          }
          return action.payload;
        }),
      };
    case 'SWAP_BLOCKS':
      if (
        action.payload.first < 0 ||
        action.payload.first >= state.blocks.length
      ) {
        throw new Error("Can't swap, wrong id");
      }
      if (
        action.payload.second < 0 ||
        action.payload.second >= state.blocks.length
      ) {
        throw new Error("Can't swap, wrong id");
      }
      return {
        ...state,
        blocks: state.blocks.map((block, i) => {
          if (i === action.payload.first) {
            return state.blocks[action.payload.second];
          } else if (i === action.payload.second) {
            return state.blocks[action.payload.first];
          }
          return block;
        }),
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

  return (
    <EditBlocksContext.Provider value={{ dispatch }}>
      <div>
        <EditControls blocks={state.blocks} />
        <FlipMove>
          {state.blocks.map((block, i) => {
            const block_validation_error = state.validation_error?.block_errors.find(
              (e) => e.block_id === i
            );
            return (
              <div key={block.id}>
                <EditBlockWrapper
                  block={block}
                  validation_error={block_validation_error}
                  position={i}
                  total={state.blocks.length}
                >
                  <AnyBlock {...block} />
                </EditBlockWrapper>
              </div>
            );
          })}
        </FlipMove>
      </div>
    </EditBlocksContext.Provider>
  );
};

export default EditWagtailBlocks;
