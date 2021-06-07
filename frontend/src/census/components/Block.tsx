import React from 'react';

import { Data } from '../types';
import HistogramContent from './HistogramContent';
import { RightSide } from './RightSide';
import { TextContent } from './TextContent';

const Note: React.FC = ({ children }) => (
  <small className="block text-xs break-words mt-0.5">{children}</small>
);

interface BlockProps {
  name: string;
  data: Data;
}

const SimpleTitle: React.FC = ({ children }) => (
  <h3 className="m-0 text-xl font-normal leading-tight">{children}</h3>
);

const Title: React.FC<BlockProps> = (props) => {
  if (!props.name.match(/^(psy|slang|online)_/)) {
    return <SimpleTitle>{props.data.title}</SimpleTitle>;
  }

  const match = props.data.title.match(/^(.*) \[(.*)\]$/);
  if (!match) {
    return <SimpleTitle>{props.data.title}</SimpleTitle>;
  }
  const cat_title = match[1];
  const item_title = match[2];
  return (
    <SimpleTitle>
      <span className="text-gray-600">{cat_title}:</span>
      <br />
      <span>{item_title}</span>
    </SimpleTitle>
  );
};

export const Block: React.FC<BlockProps> = (props) => {
  const renderContent = () => {
    switch (props.data.show) {
      case 'text':
        return <TextContent {...props} />;
      case 'histogram':
        return <HistogramContent {...props} />;
      default:
        return <strong>БАГ: неизвестный тип данных</strong>;
    }
  };

  return (
    <section id={'question-' + props.name}>
      <div className="mb-2">
        <RightSide>
          <Title {...props} />
          {props.data.note && <Note>{props.data.note}</Note>}
          {props.data.multiple && (
            <Note>
              (Этот вопрос допускал несколько ответов, сумма может превышать
              100%.)
            </Note>
          )}
        </RightSide>
      </div>
      {renderContent()}
    </section>
  );
};
