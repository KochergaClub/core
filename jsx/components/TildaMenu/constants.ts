export const teamColor = '#417690';

export interface SingleItem {
  title: string;
  link: string;
  old?: boolean;
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
        old: true,
      },
      { link: '/blog', title: 'Блог' },
    ],
  },
  { link: '/#contacts', title: 'Контакты', old: true },
];

export const teamMenuItems: Item[] = [
  {
    title: 'Админам',
    items: [
      { link: '/team/cashier/', title: 'Касса' },
      { link: '/team/watchmen/', title: 'Смены' },
    ],
  },
  {
    title: 'Менеджерам',
    items: [
      { link: '/team/analytics/', title: 'Аналитика' },
      { link: '/team/mastermind_dating/', title: 'Мастермайнд' },
      { link: '/team/zadarma/', title: 'Звонки' },
      { link: '/admin/', title: 'Админка' },
    ],
  },
  {
    title: 'События',
    items: [
      { link: '/team/events/', title: 'Календарь' },
      { link: '/team/ratio/', title: 'Тренинги' },
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
