export const HeroHeader: React.FC = ({ children }) => (
  // previously:
  // font-family: Intro;
  <h1 className="m-0 text-white text-2xl sm:text-3xl md:text-5xl">
    {children}
  </h1>
);
