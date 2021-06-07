import clsx from 'clsx';
import React from 'react';

// should have two children
export const LeftRight: React.FC = ({ children }) => (
  <div className="grid text-xs gap-1 grid-cols-3">
    {React.Children.map(children, (child, i) => (
      <div key={i} className={clsx(i === 1 && 'col-span-2')}>
        {child}
      </div>
    ))}
  </div>
);
