import { TemplateState } from './reducer';

const jsonToQueryString = (json: { [k: string]: string }) => {
  return (
    '?' +
    Object.keys(json)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(json[key]))
      .join('&')
  );
};

export const state2link = ({
  name,
  state,
  type,
}: {
  name: string;
  state: TemplateState;
  type: 'html' | 'png';
}) =>
  `https://kocherga.club/api/templater/${name}/${type}` +
  jsonToQueryString(state);
