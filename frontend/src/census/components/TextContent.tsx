import React from 'react';

import { Data } from '../types';
import { RightSide } from './RightSide';

export const TextContent: React.FC<{ data: Data }> = ({ data }) => (
  <RightSide>
    <div className="space-y-3">
      {data.values.map((value, i) => (
        <div className="text-xs" key={i}>
          {value.value}
        </div>
      ))}
    </div>
  </RightSide>
);
