import { API } from '../utils';

interface WagtailImage {
  url: string;
  width: string;
  height: string;
}

interface WagtailItem {
  id: number;
  title: string;
  body: string;
  meta: {
    slug: string;
  };
}

export interface Project extends WagtailItem {
  image: WagtailImage;
  image_thumbnail: WagtailImage;
  summary?: string;
  activity_summary?: string;
  description?: string;
}

export const getAllProjects = async (api: API): Promise<Project[]> => {
  const json = await api.call(
    'wagtail/pages/?type=projects.ProjectPage&fields=summary,image,image_thumbnail',
    'GET'
  );
  return json.items;
};

export const getProject = async (slug: string, api: API): Promise<Project> => {
  const json = await api.call(
    `wagtail/pages/?type=projects.ProjectPage&slug=${slug}&fields=summary,activity_summary,body,image,image_thumbnail`,
    'GET'
  );
  return json.items[0];
};
