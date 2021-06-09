import React from 'react';

import { A } from '~/frontkit';

import { Survey } from '../types';
import { RightSide } from './RightSide';

export const Menu: React.FC<{ survey: Survey }> = ({ survey }) => (
  <RightSide>
    <nav>
      <ul className="p-0 list-none">
        {survey.structure.map((group, i) => (
          <li key={i}>
            <A href={'#group-' + i}>{group.title}</A>
            <ul className="list-none">
              {group.columns.map((column) => (
                <li key={column}>
                  <A href={'#question-' + column}>
                    {survey.data[column].title}
                  </A>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  </RightSide>
);
