import styled from 'styled-components';

import { RatioNotebookPageFragment } from '../fragments.generated';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  @media screen {
    min-height: 600px;
  }
  break-after: page;
`;

const Line = styled.a`
  display: block;
  color: black;
  text-decoration: none;
  border-bottom: 1px solid #888;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

export default function SectionTOC(props: { page: RatioNotebookPageFragment }) {
  return (
    <Container>
      {props.page.sections.map(section => {
        const sectionPage = section.value;
        return (
          <Line key={sectionPage.id} href={`#section-${sectionPage.meta.slug}`}>
            {sectionPage.title}
          </Line>
        );
      })}
    </Container>
  );
}
