import React from 'react';

import { Survey } from '../types';
import { RightSide } from './RightSide';

export const Menu: React.FC<{ survey: Survey }> = ({ survey }) => (
  <RightSide>
    <nav>
      <ul className="p-0 list-none">
        {survey.structure.map((group, i) => (
          <li key={i}>
            <a href={'#group-' + i}>{group.title}</a>
            <ul className="list-none">
              {group.columns.map((column) => (
                <li key={column}>
                  <a href={'#question-' + column}>
                    {survey.data[column].title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  </RightSide>
);
