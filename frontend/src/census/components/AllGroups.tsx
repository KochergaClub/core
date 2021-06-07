import React from 'react';

import { Survey } from '../types';
import { Block } from './Block';
import { RightSide } from './RightSide';

const Group: React.FC<{ id: number; title: string }> = (props) => (
  <div className="mb-8">
    <RightSide>
      <h2 className="underline text-3xl font-normal" id={'group-' + props.id}>
        {props.title}
      </h2>
    </RightSide>
    {props.children}
  </div>
);

export const AllGroups: React.FC<{ survey: Survey }> = ({ survey }) => (
  <div className="space-y-12">
    {survey.structure.map((group, i) => (
      <Group title={group.title} id={i} key={i}>
        <div className="space-y-8">
          {group.columns.map((column) => (
            <Block name={column} data={survey.data[column]} key={column} />
          ))}
        </div>
      </Group>
    ))}
  </div>
);
