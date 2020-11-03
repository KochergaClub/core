import { useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import styled, { css } from 'styled-components';

import { colors } from '~/frontkit';

const Container = styled.div`
  position: relative;
`;

const placeholderStyles = css`
  text-transform: uppercase;
  letter-spacing: 1.3px;
  font-size: 12px;
`;

const Placeholder = styled.div`
  padding: 4px 8px;
  padding-left: 28px;
  color: white;
  cursor: pointer;

  ${placeholderStyles}
`;

const Input = styled.input`
  border-radius: 4px;
  padding: 4px 8px;
  padding-left: 28px;

  background-color: transparent;
  border: 1px solid transparent;
  width: 80px;
  transition: width 0.15s;

  &::placeholder {
    ${placeholderStyles}
  }

  &:focus {
    outline: none;
    border: 1px solid ${colors.accent[500]};
    background-color: white;
    width: 200px;
  }
`;

const SearchIcon = styled(FaSearch)<{ active?: boolean }>`
  position: absolute;
  left: 6px;
  top: 6px;

  color: ${(props) => (props.active ? colors.grey[500] : 'white')};
  cursor: pointer;
`;

interface Props {
  active: boolean;
  start: () => void;
  stop: () => void;
  query: string;
  setQuery: (query: string) => void;
}

const SearchInput: React.FC<Props> = ({ active, start, query, setQuery }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (active) {
      inputRef.current?.focus();
    }
  }, [active]);

  if (!active) {
    return (
      <Container onClick={start}>
        <SearchIcon active={active || undefined} />
        <Placeholder>Поиск</Placeholder>
      </Container>
    );
  }

  return (
    <Container>
      <SearchIcon active={active || undefined} />
      <Input
        type="text"
        value={query}
        placeholder="Поиск"
        onChange={(e) => setQuery(e.currentTarget.value)}
        ref={inputRef}
      />
    </Container>
  );
};

export default SearchInput;
