import styled from 'styled-components';

export const Header = styled.header`
  color: #666;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
`;

interface HintProps {
  isValid: boolean;
}

export const Hint = styled('div')<HintProps>`
  color: ${ (props: HintProps) => props.isValid ? 'black' : 'red' };
`;

export const Section = styled.section`
  margin-bottom: 20px;
`;

export const Card = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  margin-bottom: 40px;
`;

export const Note = styled.span`
  color: #666;
`;
