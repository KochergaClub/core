import React from 'react';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import gfm from 'remark-gfm';

import { RichText } from '~/frontkit';

type Props = {
  source: string;
};

export const Markdown: React.FC<Props> = ({ source }) => {
  return (
    <RichText>
      <ReactMarkdown plugins={[gfm, breaks]}>{source}</ReactMarkdown>
    </RichText>
  );
};
