export const HeroWithImage: React.FC<{ image: string }> = ({
  image,
  children,
}) => (
  <div
    className="bg-cover bg-center"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${image})`,
    }}
  >
    {children}
  </div>
);
