import * as React from 'react';
import styled from 'styled-components';

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const CheckboxLabel = styled.label`
  display: block;
  margin-bottom: 0;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
  color: #666;
  }
`;

const CheckboxInput = styled.input.attrs({
  type: 'checkbox',
})`
`;

export default class Checkbox extends React.Component<CheckboxProps> {
  render() {
    return (
      <CheckboxLabel>
        <CheckboxInput checked={this.props.checked} onChange={this.props.onChange} />
        {' '}
        {this.props.children}
      </CheckboxLabel>
    );
  }
}
