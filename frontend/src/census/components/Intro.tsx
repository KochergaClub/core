import React, { useContext } from 'react';

import { MainContext } from '../contexts';
import { TextBox } from './TextBox';

const Stats: React.FC = () => {
  const { total } = useContext(MainContext);

  return <div className="text-center text-2xl">Всего участников: {total}</div>;
};

export const Intro: React.FC = () => (
  <TextBox>
    <p>Перепись проходила в феврале 2021.</p>
    <p>
      То, как выглядел оригинальный опрос, можно посмотреть{' '}
      <a href="original-survey.pdf">тут (pdf)</a>.
    </p>
    <p>
      Некоторые подробности об том, как обрабатывались результаты, можно узнать{' '}
      <a href="#outro">в конце этой страницы</a>.
    </p>
    <p>
      Прошлые переписи: <a href="https://lesswrong.ru/survey/2015/">2015</a>,{' '}
      <a href="https://lesswrong.ru/survey/2016/">2016</a>,{' '}
      <a href="https://lesswrong.ru/survey/2018/">2018</a>,{' '}
    </p>
    <Stats />
  </TextBox>
);
