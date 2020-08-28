import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { WagtailPageContext } from '~/cms/contexts';
import { Page } from '~/components';
import WagtailBlocks from '~/wagtail/components/WagtailBlocks';
import { AnyBlockFragment } from '~/wagtail/types';

const WagtailBlocksDemoPage: NextApolloPage = () => {
  const blocks: AnyBlockFragment[] = [
    {
      id: '',
      __typename: 'BasicLeadBlock',
      value: 'Базовый заголовок (BasicLeadBlock)',
    },
    {
      id: '',
      __typename: 'BasicTextBlock',
      basic_text: {
        __typename: 'BasicTextBlockValue',
        text:
          'Обычный текст (BasicTextBlock). Поддерживает html-форматирование: <b>bold</b>, <i>italic</i>. По умолчанию выравнивается по левому краю.',
        centered: false,
      },
    },
    {
      id: '',
      __typename: 'BasicTextBlock',
      basic_text: {
        __typename: 'BasicTextBlockValue',
        text:
          'Обычный текст (BasicTextBlock) с центрированием. Поддерживает html-форматирование: <b>bold</b>, <i>italic</i>. При проставленной настройке "centered" выравнивается по центру.',
        centered: true,
      },
    },
    {
      id: '',
      __typename: 'GreyBlock',
      grey_value: {
        __typename: 'GreyBlockValue',
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
          __typename: 'ColumnsBasicBlockValue',
          header: 'Колонка 1',
          text: '',
        },
        {
          __typename: 'ColumnsBasicBlockValue',
          header: 'Колонка 2',
          text: 'Опциональный текст',
        },
      ],
    },
    {
      id: '',
      __typename: 'ColumnsButtonsBlock',
      button_columns: [
        {
          __typename: 'ColumnsButtonsBlockValue',
          title: 'Колонка 1',
          text: 'Описание колонки 1',
          caption: 'Заголовок 1',
          link: 'https://example.com',
          image: {
            __typename: 'WagtailImageRendition',
            id: '1',
            url: 'https://example.com',
          },
        },
        {
          __typename: 'ColumnsButtonsBlockValue',
          title: 'Колонка 2',
          text: 'Описание колонки 2',
          caption: 'Заголовок 2',
          link: 'https://example.com',
          image: {
            __typename: 'WagtailImageRendition',
            id: '1',
            url: 'https://example.com',
          },
        },
      ],
    },
    {
      id: '',
      __typename: 'BigContactsBlock',
      contacts: {
        __typename: 'BigContactsBlockValue',
        map: {
          __typename: 'WagtailGeo',
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
        __typename: 'MailchimpSubscribeBlockValue',
        news: true,
        events: true,
        trainings: true,
      },
    },
  ];

  return (
    <Page title="Примеры Wagtail-блоков" menu="team">
      <Page.Title>Примеры Wagtail-блоков</Page.Title>
      <WagtailPageContext.Provider value={{ state: { preview: true } }}>
        <WagtailBlocks blocks={blocks} />
      </WagtailPageContext.Provider>
    </Page>
  );
};

export default withApollo(withStaff(WagtailBlocksDemoPage));
