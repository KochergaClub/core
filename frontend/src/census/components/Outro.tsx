import React from 'react';

import { HintCard } from '~/components';
import { A } from '~/frontkit';

import { Survey } from '../types';

interface Props {
  survey: Survey;
}

export const Outro: React.FC<Props> = ({ survey }) => (
  <HintCard>
    <h4>Подробности об обработке данных и технологиях</h4>
    <p>Перепись продолжалась с 13 по 28 февраля 2021.</p>
    <p>***</p>
    <p>
      Форму заполнили 591 раз. В итоговые данные вошли 584 анкеты, ещё 7
      отсеялись как очевидные дубли (полностью или почти полностью совпадающие
      поля, либо подписанные одинаковым именем, либо отправленные несколько раз
      за несколько секунд).
    </p>
    <p>***</p>
    <p>
      Участники опроса могли отметить чекбокс «Разрешаю опубликовать полные
      данные моей анкеты». Его отметили в 282 анкетах из 584. Прочитать их
      ответы и скачать их для дальнейшего анализа можно{' '}
      <A href="https://docs.google.com/spreadsheets/d/1_8DQzcJ7h77yid2qouZoyxcPOewrUgay0xLs8tSrZVQ">
        по этой ссылке
      </A>
      .
    </p>
    <p>
      (Зачем нужна опция про приватность? Учитывая количество вопросов,
      некоторых людей можно было бы однозначно опознать по их демографическим
      данным.)
    </p>
    <p>Доступ к полным ответам на анкету был:</p>
    <ul>
      <li>у Вячеслава Матюхина (организатор опроса)</li>
      <li>у компании Google</li>
    </ul>
    <p>***</p>
    <p>
      Некоторые ответы (не очень многие) были нормализованы. Скрипты для
      обработки данных можно найти{' '}
      <A href="https://gitlab.com/kocherga/core/-/tree/master/backend/kocherga/community/census">
        тут
      </A>
      .
    </p>
    <p>
      Ответы на вопрос про IQ округлён до десятков, на вопрос про доход - до
      категорий, которые вы можете видеть выше.
    </p>
    <p>***</p>
    <p>
      Данные, из которых верстается страница итогов переписи, лежат в{' '}
      <A href="/census-data/2021/data.json">отдельном файле</A>. Ответы
      отсортированы по каждому вопросу отдельно для сохранения приватности
      участников.
    </p>
  </HintCard>
);