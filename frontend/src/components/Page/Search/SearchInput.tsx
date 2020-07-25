import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

import { colors } from '@kocherga/frontkit';

const Input = styled.input`
  border-radius: 4px;
  padding: 4px 8px;
  padding-left: 24px;

  background-color: ${colors.grey[300]};
  border: 1px solid ${colors.grey[300]};
  width: 100px;
  transition: width 0.15s;

  &:focus {
    outline: none;
    border: 1px solid ${colors.accent[500]};
    background-color: white;
    width: 200px;
  }
`;

interface Props {
  query: string;
  setQuery: (query: string) => void;
}

const SearchInput: React.FC<Props> = ({ query, setQuery }) => {
  return (
    <div style={{ position: 'relative' }}>
      <FaSearch
        style={{
          position: 'absolute',
          left: 6,
          top: 6,
          color: colors.grey[500],
        }}
      />
      <Input
        type="text"
        value={query}
        placeholder="Поиск"
        onChange={e => setQuery(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchInput;
