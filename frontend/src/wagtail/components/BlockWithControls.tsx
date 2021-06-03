interface Props {
  renderControls?: () => React.ReactNode;
}

export const BlockWithControls: React.FC<Props> = ({
  renderControls,
  children,
}) => {
  return (
    <div className="relative hover:z-10 hover:ring-2 hover:ring-inset hover:ring-primary-300">
      {renderControls ? (
        <div className="absolute top-2 left-2">{renderControls()}</div>
      ) : null}
      {children}
    </div>
  );
};
