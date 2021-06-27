import React, { useContext } from 'react';

import { gql } from '@apollo/client';

import { WagtailPageContext } from '~/cms/contexts';
import { PaddedBlock } from '~/components';

import { BlockComponent } from '../../types';
import { AnchorBlockFragment as Props } from './index.generated';

const AnchorBlock: BlockComponent<Props> = (props) => {
  const {
    state: { editing },
  } = useContext(WagtailPageContext);

  let result = <div id={props.anchor} />;

  if (editing) {
    result = (
      <div className="bg-gray-100 border border-gray-300">
        <PaddedBlock>
          <div>Якорь: #{props.anchor}</div>
          <div className="text-xs">
            (Этот блок будет не виден при просмотре страницы)
          </div>
          {result}
        </PaddedBlock>
      </div>
    );
  }

  return result;
};

AnchorBlock.fragment = gql`
  fragment AnchorBlock on AnchorBlock {
    id
    anchor: value
  }
`;

export default AnchorBlock;
