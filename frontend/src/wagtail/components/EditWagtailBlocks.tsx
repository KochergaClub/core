import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useReducer } from 'react';

import { AnyBlockFragment } from '../types';
import { AnyBlock } from './AnyBlock';
import { EditBlockWrapper } from './EditBlockWrapper';
import { EditControls } from './EditControls';
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

type AddBlockAction = {
  type: 'ADD_BLOCK';
  payload: {
    block: AnyBlockFragment;
    position: number;
  };
};

type ReplaceBlocksAction = {
  type: 'REPLACE_BLOCKS';
  payload: AnyBlockFragment[];
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

type ClearValidationErrorAction = {
  type: 'CLEAR_VALIDATION_ERROR';
};
type Action =
  | DeleteBlockAction
  | EditBlockAction
  | AddBlockAction
  | SwapBlocksAction
  | SetValidationErrorAction
  | ClearValidationErrorAction
  | ReplaceBlocksAction;

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
    case 'ADD_BLOCK':
      return {
        ...state,
        blocks: [
          ...state.blocks.slice(0, action.payload.position),
          action.payload.block,
          ...state.blocks.slice(action.payload.position),
        ],
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
    case 'CLEAR_VALIDATION_ERROR':
      return {
        ...state,
        validation_error: undefined,
      };
    case 'REPLACE_BLOCKS':
      return {
        ...state,
        blocks: action.payload,
        validation_error: undefined,
      };
  }
};

export const EditWagtailBlocks: React.FC<Props> = ({ blocks }) => {
  // copying blocks data since we're going to edit them on frontend
  const [state, dispatch] = useReducer(reducer, { blocks: [] });

  // if the entire wagtail page changes (e.g. on calling SET_PAGE in WagtailPageContext) then we drop all edited blocks
  // TODO - get rid of EditBlocksContext, just change page in WagtailPageContext instead with action helpers
  useEffect(() => {
    dispatch({
      type: 'REPLACE_BLOCKS',
      payload: blocks,
    });
  }, [blocks]);

  return (
    <EditBlocksContext.Provider value={{ dispatch }}>
      <div>
        <EditControls blocks={state.blocks} />
        <AnimatePresence initial={false}>
          {state.blocks.map((block, i) => {
            const block_validation_error =
              state.validation_error?.block_errors.find((e) => e.block_id === i)
                ?.error || undefined;
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                layout
                key={block.id}
              >
                <EditBlockWrapper
                  block={block}
                  validation_error={block_validation_error}
                  position={i}
                  total={state.blocks.length}
                >
                  <AnyBlock {...block} />
                </EditBlockWrapper>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </EditBlocksContext.Provider>
  );
};
