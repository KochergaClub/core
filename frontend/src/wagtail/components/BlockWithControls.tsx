interface Props {
  renderControls?: () => React.ReactNode;
}

export const BlockWithControls: React.FC<Props> = ({
  renderControls,
  children,
}) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 z-10 pointer-events-none group-hover:ring-inset group-hover:ring-2 group-hover:ring-primary-300" />
      {renderControls ? (
        <div className="absolute top-2 left-2">{renderControls()}</div>
      ) : null}
      {children}
    </div>
  );
};
