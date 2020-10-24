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
  mode?: 'next' | 'wagtail';
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
      { link: '/events', title: 'Расписание мероприятий', mode: 'next' },
      { link: '/projects', title: 'Проекты', mode: 'wagtail' },
      { link: '/community/chats', title: 'Чаты', mode: 'next' },
    ],
  },
  {
    title: 'Обучение',
    items: [
      { link: '/rationality', title: 'Рациональность', mode: 'wagtail' },
      {
        link: '/rationality/online',
        title: 'Онлайн-курс',
        mode: 'wagtail',
        highlight: true,
      },
      { link: '/rationality/corporate', title: 'Для бизнеса', mode: 'wagtail' },
      { link: '/workshop/country', title: 'Выездной воркшоп', mode: 'wagtail' },
      {
        link: '/rationality/integration',
        title: 'Интеграция',
        mode: 'wagtail',
      },
      { link: '/rationality/dojo', title: 'Додзё', mode: 'wagtail' },
      { link: '/3week', title: 'Трёхнедельный курс', mode: 'wagtail' },
    ],
  },
  {
    title: 'Материалы',
    items: [
      { link: '/blog', title: 'Блог', mode: 'wagtail' },
      { link: 'https://www.youtube.com/c/КочергаКлуб', title: 'YouTube' },
      { link: 'https://lesswrong.ru', title: 'LessWrong.ru' },
    ],
  },
  {
    title: 'Мета',
    items: [
      { link: '/faq', title: 'F.A.Q.', mode: 'wagtail' },
      { link: '/patreon', title: 'Помочь', mode: 'wagtail' },
      { link: '/#contacts', title: 'Контакты' },
    ],
  },
];

const teamMenuItems: Item[] = [
  {
    title: 'Пространство',
    items: [
      { link: '/team/space/staff/shifts', title: 'Смены', mode: 'next' },
      { link: '/team/space/staff', title: 'Админы', mode: 'next' },
      { link: '/team/zadarma', title: 'Звонки', mode: 'next' },
      { link: '/team/cashier', title: 'Касса', mode: 'next' },
    ],
  },
  {
    title: 'События',
    items: [
      { link: '/team/events', title: 'Календарь', mode: 'next' },
      { link: '/team/ratio', title: 'Тренинги', mode: 'next' },
      { link: '/team/mastermind_dating', title: 'Мастермайнд', mode: 'next' },
      { link: '/team/evenman', title: 'Evenman', mode: 'next' },
    ],
  },
  {
    title: 'Прочее',
    items: [
      { link: '/team/analytics', title: 'Аналитика', mode: 'next' },
      {
        link: '/team/audit',
        title: 'Аудит',
        mode: 'next',
        permissions: ['kocherga_auth.audit'],
      },
      {
        link: '/team/image-templater',
        title: 'Генератор картинок',
        mode: 'next',
      },
      {
        link: '/team/email',
        title: 'Каналы подписок',
        mode: 'next',
      },
      { link: '/admin/', title: 'Django-админка' },
      { link: '/wagtail/', title: 'Wagtail-админка' },
    ],
  },
  {
    title: 'Внешние сервисы',
    items: [
      { link: 'https://wiki.team.kocherga.club', title: 'Вики' },
      { link: 'https://kocherga.slack.com', title: 'Slack' },
      { link: 'https://kocherga.cafe-manager.ru', title: 'Кафе-менеджер' },
      { link: 'https://tracker.yandex.ru', title: 'Трекер' },
      { link: 'https://metabase.team.kocherga.club', title: 'Metabase' },
    ],
  },
];

const myMenuItems: Item[] = [
  {
    title: 'События',
    link: '/my',
    mode: 'next',
  },
  {
    title: 'Посещения',
    link: '/my/visits',
    mode: 'next',
  },
  {
    title: 'Настройки',
    link: '/my/settings',
    mode: 'next',
  },
];

export const kind2items: { [k: string]: Item[] } = {
  public: publicMenuItems,
  team: teamMenuItems,
  my: myMenuItems,
};
