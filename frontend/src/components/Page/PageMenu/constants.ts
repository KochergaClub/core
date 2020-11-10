import baseStyled, { ThemedBaseStyledInterface } from 'styled-components';

import { colors } from '~/frontkit';

import { MenuKind } from '../types';

export const kind2color = {
  team: '#417690',
  public: 'black',
  my: colors.primary[900],
};

export interface SingleItem {
  title: string;
  link: string;
  mode?: 'external';
  permissions?: string[];
  highlight?: boolean;
}

export interface ExpandableItem {
  title: string;
  items: SingleItem[];
}

export type Item = SingleItem | ExpandableItem;

export interface ThemeProps {
  kind: MenuKind;
}

export const styled = baseStyled as ThemedBaseStyledInterface<ThemeProps>; // used for strongly typed `theme.kind`

const publicMenuItems: Item[] = [
  {
    title: 'Сообщество',
    items: [
      { link: '/events', title: 'Расписание мероприятий' },
      { link: '/projects', title: 'Проекты' },
      { link: '/community/chats', title: 'Чаты' },
      {
        link: '/events/manage',
        title: 'Управление мероприятиями',
        permissions: ['events.manage'],
      },
    ],
  },
  {
    title: 'Обучение',
    items: [
      { link: '/rationality', title: 'Рациональность' },
      {
        link: '/rationality/start',
        title: 'Шаблон Смоделируй и начни',
        highlight: true,
        mode: 'external',
      },
      {
        link: '/rationality/online',
        title: 'Онлайн-курс Рациональность в деле',
        highlight: true,
      },
      { link: '/rationality/corporate', title: 'Для бизнеса' },
      { link: '/workshop/country', title: 'Выездной воркшоп' },
      {
        link: '/rationality/integration',
        title: 'Интеграция',
      },
      { link: '/rationality/dojo', title: 'Додзё' },
      { link: '/3week', title: 'Трёхнедельный курс' },
    ],
  },
  {
    title: 'Материалы',
    items: [
      { link: '/blog', title: 'Блог' },
      {
        link: 'https://www.youtube.com/c/КочергаКлуб',
        title: 'YouTube',
        mode: 'external',
      },
      { link: 'https://lesswrong.ru', title: 'LessWrong.ru', mode: 'external' },
    ],
  },
  {
    title: 'Мета',
    items: [
      { link: '/faq', title: 'F.A.Q.' },
      { link: '/patreon', title: 'Помочь' },
      { link: '/#contacts', title: 'Контакты' },
    ],
  },
];

const teamMenuItems: Item[] = [
  {
    title: 'Пространство',
    items: [
      { link: '/team/space/staff/shifts', title: 'Смены' },
      { link: '/team/space/staff', title: 'Админы' },
      { link: '/team/zadarma', title: 'Звонки' },
      { link: '/team/cashier', title: 'Касса' },
    ],
  },
  {
    title: 'События',
    items: [
      { link: '/team/events', title: 'Календарь' },
      { link: '/team/ratio', title: 'Тренинги' },
      { link: '/team/mastermind_dating', title: 'Мастермайнд' },
      { link: '/events/manage', title: 'Evenman' },
    ],
  },
  {
    title: 'Прочее',
    items: [
      { link: '/team/analytics', title: 'Аналитика' },
      {
        link: '/team/audit',
        title: 'Аудит',
        permissions: ['kocherga_auth.audit'],
      },
      {
        link: '/team/image-templater',
        title: 'Генератор картинок',
      },
      {
        link: '/team/email',
        title: 'Каналы подписок',
      },
      {
        link: '/team/kkm',
        title: 'Касса и чеки',
        permissions: ['kkm.kkmserver'],
      },
      { link: '/admin/', title: 'Django-админка', mode: 'external' },
      { link: '/wagtail/', title: 'Wagtail-админка', mode: 'external' },
    ],
  },
  {
    title: 'Внешние сервисы',
    items: [
      {
        link: 'https://www.notion.so/kocherga/c916db10771646059b15a659af29034f',
        title: 'Notion',
        mode: 'external',
      },
      {
        link: 'https://wiki.team.kocherga.club',
        title: 'Старая вики',
        mode: 'external',
      },
      { link: 'https://kocherga.slack.com', title: 'Slack', mode: 'external' },
      {
        link: 'https://metabase.team.kocherga.club',
        title: 'Metabase',
        mode: 'external',
      },
    ],
  },
];

const myMenuItems: Item[] = [
  {
    title: 'События',
    link: '/my',
  },
  {
    title: 'Посещения',
    link: '/my/visits',
  },
  {
    title: 'Настройки',
    link: '/my/settings',
  },
];

export const kind2items: { [k: string]: Item[] } = {
  public: publicMenuItems,
  team: teamMenuItems,
  my: myMenuItems,
};
