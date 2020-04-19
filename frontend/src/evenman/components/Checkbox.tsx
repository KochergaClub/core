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
})``;

const Checkbox: React.FC<CheckboxProps> = props => {
  return (
    <CheckboxLabel>
      <CheckboxInput checked={props.checked} onChange={props.onChange} />{' '}
      {props.children}
    </CheckboxLabel>
  );
};

export default Checkbox;
