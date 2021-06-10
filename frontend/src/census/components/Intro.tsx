import React, { useContext } from 'react';

import { HintCard } from '~/components';
import { A } from '~/frontkit';

import { MainContext } from '../contexts';

const Stats: React.FC = () => {
  const { total } = useContext(MainContext);

  return <div className="text-center text-2xl">Всего участников: {total}</div>;
};

export const Intro: React.FC = () => (
  <div className="flex justify-center">
    <HintCard>
      <p>Перепись проходила в феврале 2021.</p>
      <p>
        Форму опроса можно посмотреть{' '}
        <A href="/census-data/2021/form.pdf">тут (pdf)</A>.
      </p>
      <p>
        Подробности об том, как обрабатывались результаты, можно узнать{' '}
        <A href="#outro">в конце этой страницы</A>.
      </p>
      <p>
        Прошлые переписи: <A href="https://lesswrong.ru/survey/2015/">2015</A>,{' '}
        <A href="https://lesswrong.ru/survey/2016/">2016</A>,{' '}
        <A href="https://lesswrong.ru/survey/2018/">2018</A>.
      </p>
      <Stats />
    </HintCard>
  </div>
);
