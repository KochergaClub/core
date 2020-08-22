import React, { useReducer } from 'react';

import { AnyBlockFragment } from '../types';
import AnyBlock from './AnyBlock';
import EditBlockWrapper from './EditBlockWrapper';
import EditControls from './EditControls';

interface Props {
  blocks: AnyBlockFragment[];
}

interface ContextShape {
  dispatch: (action: Action) => void;
}

export const EditBlocksContext = React.createContext<ContextShape>({
  dispatch: () => undefined,
});

type Action = {
  type: 'DELETE_BLOCK';
  payload: string;
};

interface State {
  blocks: AnyBlockFragment[];
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'DELETE_BLOCK':
      return {
        ...state,
        blocks: state.blocks.filter((block) => block.id !== action.payload),
      };
  }
};

const EditWagtailBlocks: React.FC<Props> = ({ blocks }) => {
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
        <EditControls blocks={blocks} />
        {state.blocks.map((block) => (
          <EditBlockWrapper key={block.id} block={block}>
            <AnyBlock {...block} />
          </EditBlockWrapper>
        ))}
      </div>
    </EditBlocksContext.Provider>
  );
};

export default EditWagtailBlocks;
