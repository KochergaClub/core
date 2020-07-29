export type Code = 404 | 403 | 500;

export const code2title: Record<Code, string> = {
  404: 'Страница не найдена',
  403: 'Нет доступа',
  500: 'Ошибка',
};
