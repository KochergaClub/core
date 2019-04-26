import { apiCall } from '../utils';

interface WagtailImage {
  url: string;
  width: string;
  height: string;
}

interface WagtailItem {
  id: number;
  title: string;
  meta: {
    slug: string;
  };
}

export interface Project extends WagtailItem {
  image: WagtailImage;
  image_thumbnail: WagtailImage;
  summary?: string;
  description?: string;
}

const PROJECTS = {
  meta: {
    total_count: 'total number of results',
  },
  items: [
    {
      id: 1,
      title: 'Рациональное додзё',
      image:
        'https://static.tildacdn.com/tild3462-6365-4630-b731-666161393532/dojo2.jpg',
      slug: 'dojo',
      summary: 'Отработка навыков рациональности.',
    },
    {
      id: 2,
      title: 'Уличная эпистемология',
      image:
        'https://static.tildacdn.com/tild6139-3737-4330-a566-303338323639/streetepistemology.jpg',
      slug: 'street',
      summary:
        'Глубокие, вежливые и неконфронтационные разговоры о том, во что люди верят, и, главное, почему.',
      description:
        'Уличная эпистемология — это глубокие, вежливые и неконфронтационные разговоры о том, во что люди верят, и, главное, почему. Это метод ведения диалога, в котором вы помогаете собеседнику обдумать надёжность его эпистемологии — способа, которым он пришёл к своим убеждениям. Если выясняется, что убеждение покоится на зыбких основаниях, его становится гораздо проще пересмотреть. Мы — несколько практиков, которые хотят распространить уличную эпистемологию на русскоязычном пространстве и создать сообщество энтузиастов для обмена опытом и совершенствования навыков.',
    },
    {
      id: 3,
      title: 'Ненасильственное общение',
      image:
        'https://static.tildacdn.com/tild3232-6334-4737-b963-386639396238/nvc.jpg',
      slug: 'nvc',
      summary:
        'Разбираем предлагаемые конфликты и тренируем на них навыки ненасильственного общения.',
    },
    {
      id: 4,
      title: 'Английский клуб с рационалистами',
      image:
        'https://static.tildacdn.com/tild3662-3464-4862-a637-316163343164/the_mad_hatter_s_tea.jpg',
      slug: 'english',
      summary: 'Тренировка разговорного английского.',
    },
  ],
};

export const getAllProjects = async (): Promise<Project[]> => {
  const json = await apiCall(
    'wagtail/pages/?type=projects.ProjectPage&fields=summary,image,image_thumbnail',
    'GET'
  );
  return json.items;
};

export const getProject = async (slug: string): Promise<Project> => {
  const json = await apiCall(
    `wagtail/pages/?type=projects.ProjectPage&slug=${slug}&fields=summary,image,image_thumbnail`,
    'GET'
  );
  return json.items[0];
};
