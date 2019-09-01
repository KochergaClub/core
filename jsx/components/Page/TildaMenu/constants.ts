export const teamColor = '#417690';

export interface SingleItem {
  title: string;
  link: string;
  mode?: 'old' | 'next' | 'wagtail';
  permissions?: string[];
}

export interface ExpandableItem {
  title: string;
  items: SingleItem[];
}

export type Item = SingleItem | ExpandableItem;

export const publicMenuItems: Item[] = [
  {
    title: 'Пространство',
    items: [
      { link: '/space', title: 'Пространство' },
      { link: '/pricing', title: 'Цены' },
      { link: '/faq', title: 'F.A.Q.' },
    ],
  },
  {
    title: 'Сообщество',
    items: [
      { link: '/projects', title: 'Проекты' },
      { link: '/#schedule', title: 'Расписание мероприятий' },
      { link: '/blog', title: 'Блог' }, // TODO - mode: 'wagtail', but can't enable it until old blog is disabled
    ],
  },
  {
    title: 'Обучение',
    items: [
      { link: '/rationality', title: 'Рациональность' },
      { link: '/rationality/dojo', title: 'Додзё' },
      { link: '/rationality/3week', title: 'Трёхнедельный курс' },
      { link: '/workshop/country', title: 'Выездной воркшоп' },
      { link: '/rationality/integration', title: '"Интеграция"' },
      { link: '/rationality/corporate', title: 'Для бизнеса' },
    ],
  },
  { link: '/#contacts', title: 'Контакты' },
];

export const teamMenuItems: Item[] = [
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
