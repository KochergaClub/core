import styled from 'styled-components';

interface Props {
  items: {
    link: string;
    title: string;
  }[];
}

const UL = styled.ul`
  list-style-type: none;
  padding: 0;

  a {
    color: #ddd;
    text-decoration: none;
    font-size: 14px;
  }

  li {
    margin-bottom: 5px;
  }
`;

const PartLinks = ({ items }: Props) => {
  return (
    <UL>
      {items.map((item, i) => (
        <li key={i}>
          <a href={item.link}>{item.title}</a>
        </li>
      ))}
    </UL>
  );
};

export default PartLinks;
