import { withApollo, withStaff, NextApolloPage } from '~/apollo';

import { Page } from '~/components';

import WagtailBlocks, { AnyBlockFragment } from '~/wagtail/WagtailBlocks';

const WagtailBlocksDemoPage: NextApolloPage = () => {
  const blocks: AnyBlockFragment[] = [
    {
      id: '',
      __typename: 'BasicLeadBlock',
      value: 'Базовый заголовок',
    },
    {
      id: '',
      __typename: 'BasicParagraphBlock',
      value:
        'Обычный текст. Поддерживает html-форматирование: <b>bold</b>, <i>italic</i>.',
    },
    {
      id: '',
      __typename: 'GreyBlock',
      grey_value: {
        header: 'Серый блок',
        text:
          'Текст поддерживает html-форматирование: <b>bold</b>, <i>italic</i>.',
      },
    },
    {
      id: '',
      __typename: 'ColumnsBasicBlock',
      basic_columns: [
        {
          header: 'Колонка 1',
          text: '',
        },
        {
          header: 'Колонка 2',
          text: 'Опциональный текст',
        },
      ],
    },
    {
      id: '',
      __typename: 'ColumnsMembershipsBlock',
      membership_columns: [
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
      __typename: 'ColumnsButtonsBlock',
      button_columns: [
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
      __typename: 'BigContactsBlock',
      contacts: {
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
      __typename: 'MailchimpSubscribeBlock',
      mailchimp: {
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
          __typename: 'BasicLeadBlock',
          value: block.__typename + ':',
        },
        block,
      ] as AnyBlockFragment[]
  );

  // can't use [].flat yet - not supported by node
  const blocksWithHeaders = ([] as AnyBlockFragment[]).concat.apply(
    [],
    headedPairs
  );

  return (
    <Page title="Примеры Wagtail-блоков" menu="team">
      <Page.Title>Примеры Wagtail-блоков</Page.Title>
      <WagtailBlocks blocks={blocksWithHeaders} />
    </Page>
  );
};

export default withApollo(withStaff(WagtailBlocksDemoPage));
