interface Props {
  items: {
    link: string;
    title: string;
  }[];
}

export const PartLinks = ({ items }: Props) => {
  return (
    <ul className="list-none p-0">
      {items.map((item, i) => (
        <li key={i} className="mb-1">
          <a className="no-underline text-sm text-gray-200" href={item.link}>
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
