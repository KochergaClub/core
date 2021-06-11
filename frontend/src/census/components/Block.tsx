import React from 'react';
import { FaLink } from 'react-icons/fa';

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

const TitleContainer: React.FC = ({ children }) => (
  <h3 className="m-0 text-xl font-normal leading-tight">{children}</h3>
);

const Anchor: React.FC<{ blockName: string }> = ({ blockName }) => (
  <a
    href={'#' + name2id(blockName)}
    className="text-gray-200 hover:text-gray-600 leadning-none"
  >
    <FaLink />
  </a>
);

const SimpleTitle: React.FC<{ blockName: string; title: string }> = ({
  blockName,
  title,
}) => (
  <TitleContainer>
    <span>{title}</span> <Anchor blockName={blockName} />
  </TitleContainer>
);

const name2id = (name: string) => `question-${name}`;

const Title: React.FC<BlockProps> = (props) => {
  if (!props.name.match(/^(psy|slang|online|goals|endorse|interest)_/)) {
    return <SimpleTitle title={props.data.title} blockName={props.name} />;
  }

  const match = props.data.title.match(/^(.*) \[(.*)\]$/);
  if (!match) {
    return <SimpleTitle title={props.data.title} blockName={props.name} />;
  }
  const cat_title = match[1];
  const item_title = match[2];
  return (
    <TitleContainer>
      <div className="text-gray-600">
        {cat_title}
        {cat_title.endsWith('?') ? '' : ':'}
      </div>
      <div>
        <span>{item_title}</span> <Anchor blockName={props.name} />
      </div>
    </TitleContainer>
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
    <section id={name2id(props.name)}>
      <div className="mb-2">
        <RightSide stretchOnMobile>
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
