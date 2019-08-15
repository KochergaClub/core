export const teamColor = '#417690';

export interface SingleItem {
  title: string;
  link: string;
  mode?: 'old' | 'next' | 'wagtail';
}

export interface ExpandableItem {
  title: string;
  items: SingleItem[];
}

export type Item = SingleItem | ExpandableItem;

export const publicMenuItems: Item[] = [
  {
    title: 'Антикафе',
    items: [
      { link: '/space', title: 'Пространство' },
      { link: '/projects', title: 'Проекты' },
      { link: '/pricing', title: 'Цены' },
      { link: '/#schedule', title: 'Расписание' },
      { link: '/faq', title: 'F.A.Q.' },
    ],
  },
  {
    title: 'Рациональность',
    items: [
      { link: '/rationality', title: 'Прикладная рациональность' },
      { link: '/rationality/resources', title: 'Ресурсы' },
      { link: '/rationality/reports', title: 'Отчеты' },
      { link: '/rationality/aboutus', title: 'О нас говорят' },
      { link: '/workshop', title: 'Воркшоп' },
      {
        link: '/rationality/corporate',
        title: 'Корпоративные тренинги',
        mode: 'old',
      },
      { link: '/blog', title: 'Блог', mode: 'wagtail' },
    ],
  },
  { link: '/#contacts', title: 'Контакты' },
];

export const teamMenuItems: Item[] = [
  {
    title: 'Пространство',
    items: [
      { link: '/team/watchmen', title: 'Смены', mode: 'next' },
      { link: '/team/watchmen/admin', title: 'Админы', mode: 'next' },
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
    ],
  },
  {
    title: 'Прочее',
    items: [
      { link: '/team/analytics', title: 'Аналитика', mode: 'next' },
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
