export const teamColor = '#417690';

export interface MenuItem {
  title: string;
  link?: string;
  old?: boolean;
  items?: { title: string; link: string; old?: boolean }[];
}

export const publicMenuItems: MenuItem[] = [
  {
    title: 'Антикафе',
    items: [
      { link: '/space', title: 'Пространство', old: true },
      { link: '/projects', title: 'Проекты', old: true },
      { link: '/pricing', title: 'Цены', old: true },
      { link: '/#schedule', title: 'Расписание', old: true },
      { link: '/faq', title: 'F.A.Q.', old: true },
    ],
  },
  {
    title: 'Рациональность',
    items: [
      { link: '/rationality', title: 'Прикладная рациональность', old: true },
      { link: '/rationality/resources', title: 'Ресурсы', old: true },
      { link: '/rationality/reports', title: 'Отчеты', old: true },
      { link: '/rationality/aboutus', title: 'О нас говорят', old: true },
      { link: '/workshop', title: 'Воркшоп', old: true },
      {
        link: '/rationality/corporate',
        title: 'Корпоративные тренинги',
        old: true,
      },
      { link: '/blog', title: 'Блог', old: true },
    ],
  },
  { link: '/#contacts', title: 'Контакты', old: true },
];

export const teamMenuItems: MenuItem[] = [
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
      { link: '/team/ratio/', title: 'Тренинги' },
      { link: '/team/events/', title: 'События' },
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
