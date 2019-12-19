import React from 'react';
import styled from 'styled-components';

const PickerContainer = styled.div`
  position: absolute;
  top: 2em;
  border: 1px solid #888;

  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  user-select: none;

  margin-left: 4px;
  min-width: 100%;
  z-index: 10;
  background-color: white;
`;

const PickerItemContainer = styled.div`
  cursor: pointer;
  color: ${props => (props.theme.color === 'dark' ? 'white' : 'black')};

  > div {
    padding: 0 4px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
`;

interface Props<T> {
  picked: (item: T) => void;
  item2text: (item: T) => string;
  item2color?: (item: T) => string;
  items: T[];
}

interface ItemProps {
  text: string;
  color: string;
  picked: () => void;
}

const PickerItem = ({ text, color, picked }: ItemProps) => {
  return (
    <PickerItemContainer style={{ backgroundColor: color }} onClick={picked}>
      <div>{text}</div>
    </PickerItemContainer>
  );
};

function Picker<T>(props: Props<T>) {
  const { items, item2text, item2color } = props;
  return (
    <PickerContainer>
      {items.map((item, i) => (
        <PickerItem
          key={i}
          text={item2text(item)}
          color={item2color ? item2color(item) : 'white'}
          picked={() => props.picked(item)}
        />
      ))}
    </PickerContainer>
  );
}

export default Picker;
