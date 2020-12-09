import React from 'react';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';

import { RichText } from '~/frontkit';

type Props = {
  source: string;
};

export const Markdown: React.FC<Props> = ({ source }) => {
  return (
    <RichText>
      <ReactMarkdown source={source} plugins={[breaks]} />
    </RichText>
  );
};
