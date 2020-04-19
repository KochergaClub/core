import styled from 'styled-components';

interface Props {
  progress?: boolean;
  error?: string;
  children?: React.ReactNode;
}

const Loading = styled.div`
  font-size: 2em;
  text-align: center;
  color: #888;
`;

const Error = styled.div`
  font-size: 2em;
  text-align: center;
  color: red;
`;

const LoadingOverlay = (props: Props) => {
  if (props.progress) {
    return <Loading>Загружается...</Loading>;
  }
  if (props.error) {
    return <Error>Ошибка: {props.error}</Error>;
  }
  return <>{props.children}</>;
};

export default LoadingOverlay;
