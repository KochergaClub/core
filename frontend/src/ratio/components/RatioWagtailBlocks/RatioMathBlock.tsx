import MathJax from 'react-mathjax2';

import { RatioMathBlockFragment as Props } from './fragments.generated';

export default function RatioMathBlock(block: Props) {
  const match = block.value.match(/^\s*\$\$(.*)\$\$\s*$/);
  if (!match) {
    return <h1>Invalid formula</h1>;
  }

  const formula = match[1];

  return (
    <MathJax.Context input="tex">
      <div className="text-center my-5">
        <MathJax.Node>{formula}</MathJax.Node>
      </div>
    </MathJax.Context>
  );
}
