import React from 'react';
import { useSelector } from 'react-redux';

import Page from '~/components/Page';

import { NextPage } from '~/common/types';
import { selectIsStaff } from '~/core/selectors';

import WagtailBlocks from '~/wagtail/WagtailBlocks';
import { BlockType } from '~/wagtail/blocks/types';

const WagtailBlocksDemoPage: NextPage = () => {
  const isStaff = useSelector(selectIsStaff);
  if (!isStaff) {
    throw new Error('Access denied');
  }

  const blocks: BlockType[] = [
    {
      id: '',
      type: 'basic_lead',
      value: 'Базовый заголовок',
    },
    {
      id: '',
      type: 'basic_paragraph',
      value:
        'Обычный текст. Поддерживает html-форматирование: <b>bold</b>, <i>italic</i>.',
    },
    {
      id: '',
      type: 'grey',
      value: {
        header: 'Серый блок',
        text:
          'Текст поддерживает html-форматирование: <b>bold</b>, <i>italic</i>.',
      },
    },
    {
      id: '',
      type: 'columns_basic',
      value: [
        {
          header: 'Колонка 1',
        },
        {
          header: 'Колонка 2',
          text: 'Опциональный текст',
        },
      ],
    },
    {
      id: '',
      type: 'columns_memberships',
      value: [
        {
          title: 'Колонка 1',
          subtitle: 'Подзаголовок 1',
          price: 500,
          description: 'Описание 1',
        },
        {
          title: 'Колонка 2',
          subtitle: 'Подзаголовок 2',
          price: 1500,
          description: 'Описание 2',
        },
      ],
    },
    {
      id: '',
      type: 'columns_buttons',
      value: [
        {
          title: 'Колонка 1',
          caption: 'Заголовок 1',
          link: 'https://example.com',
        },
        {
          title: 'Колонка 2',
          caption: 'Заголовок 2',
          link: 'https://example.com',
        },
      ],
    },
    {
      id: '',
      type: 'big_contacts',
      value: {
        map: {
          lat: '100',
          lng: '100',
        },
        address: 'Какой-то адрес',
        phone: '+7(000)000-00-00',
        email: 'mail@example.com',
        text: 'Текст',
      },
    },
    {
      id: '',
      type: 'mailchimp_subscribe',
      value: {
        news: true,
        events: true,
        trainings: true,
      },
    },
  ];

  const headedPairs = blocks.map(
    block =>
      [
        {
          id: '',
          type: 'basic_lead',
          value: block.type + ':',
        },
        block,
      ] as BlockType[]
  );

  // can't use [].flat yet - not supported by node
  const blocksWithHeaders = ([] as BlockType[]).concat.apply([], headedPairs);

  return (
    <Page title="Примеры Wagtail-блоков" team>
      <Page.Title>Примеры Wagtail-блоков</Page.Title>
      <WagtailBlocks blocks={blocksWithHeaders} />
    </Page>
  );
};

export default WagtailBlocksDemoPage;
