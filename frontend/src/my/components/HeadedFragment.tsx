interface Props {
  title: string;
}

const HeadedFragment: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="mb-10">
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default HeadedFragment;
