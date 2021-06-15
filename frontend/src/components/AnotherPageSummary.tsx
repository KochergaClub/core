import { A } from '~/frontkit';

interface Props {
  href: string;
  title: string;
  description?: string;
}

export const AnotherPageSummary: React.FC<Props> = ({
  href,
  title,
  description,
}) => (
  <section className="border-b border-gray-200">
    <header className="mb-1">
      <A className="text-2xl" href={href}>
        {title}
      </A>
    </header>
    <div className="mb-8">{description}</div>
  </section>
);
