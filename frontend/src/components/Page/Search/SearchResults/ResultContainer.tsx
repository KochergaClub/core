import Link from 'next/link';

interface Props {
  url: string;
}

const ResultContainer: React.FC<Props> = ({ url, children }) => (
  <Link href={url} passHref>
    <a className="block px-3 py-2 text-sm text-black no-underline hover:bg-gray-100">
      {children}
    </a>
  </Link>
);

export default ResultContainer;
