import React, { useCallback, useContext } from 'react';

import { AsyncButton } from './AsyncButton';

// react context shapes can't use generics :(
type UnsafeSelect = (name: string) => Promise<void>;

interface RadioButtonContextShape {
  select: UnsafeSelect;
  selected: string;
}

export const RadioButtonContext = React.createContext<RadioButtonContextShape>({
  select: async () => {
    return;
  },
  selected: '',
});

interface ButtonProps<T extends string> {
  name: T;
  children?: React.ReactNode;
}

const RadioButton = <T extends string>({ name, children }: ButtonProps<T>) => {
  const { select, selected } = useContext(RadioButtonContext);

  const act = useCallback(async () => {
    await select(name);
  }, [select, name]);

  return (
    <AsyncButton act={act} disabled={name === selected}>
      {children}
    </AsyncButton>
  );
};

interface Props<T extends string> {
  selected: T;
  select: (name: T) => Promise<void>;
  children: React.ReactElement<ButtonProps<T>>[];
}

export const RadioButtonGroup = <T extends string>({
  select,
  selected,
  children,
}: Props<T>) => {
  return (
    <div>
      <RadioButtonContext.Provider
        value={{ select: select as UnsafeSelect, selected }}
      >
        {children}
      </RadioButtonContext.Provider>
    </div>
  );
};

RadioButtonGroup.Button = RadioButton;
