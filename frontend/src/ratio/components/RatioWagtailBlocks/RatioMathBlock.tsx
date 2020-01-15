import styled from 'styled-components';

import MathJax from 'react-mathjax2';

import { RatioMathBlockFragment as Props } from './fragments.generated';

const Container = styled.div`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default function RatioMathBlock(block: Props) {
  const match = block.value.match(/^\s*\$\$(.*)\$\$\s*$/);
  if (!match) {
    return <h1>Invalid formula</h1>;
  }

  const formula = match[1];

  return (
    <MathJax.Context input="tex">
      <Container>
        <MathJax.Node>{formula}</MathJax.Node>
      </Container>
    </MathJax.Context>
  );
}
