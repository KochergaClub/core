interface Props {
  progress?: boolean;
  error?: string;
  children?: React.ReactNode;
}

const LoadingOverlay = (props: Props) => {
  if (props.progress) {
    return (
      <div className="text-3xl text-center text-gray-500">Загружается...</div>
    );
  }
  if (props.error) {
    return (
      <div className="text-3xl text-center text-accent-700">
        Ошибка: {props.error}
      </div>
    );
  }
  return <>{props.children}</>;
};

export default LoadingOverlay;
