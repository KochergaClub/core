interface Props {
  title: string;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
}

export const PageHeader: React.FC<Props> = ({ title, top, bottom }) => {
  return (
    <div className="text-center bg-gray-100 px-8">
      <div className="pt-8">{top}</div>
      <h1 className="my-6 text-2xl sm:text-3xl md:text-5xl">{title}</h1>
      <div className="pb-8">{bottom}</div>
    </div>
  );
};
