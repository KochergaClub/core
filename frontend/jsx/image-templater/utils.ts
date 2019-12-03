export type FormState = { [k: string]: string };

export const jsonToQueryString = (json: { [k: string]: string }) => {
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
  state: FormState;
  type: 'html' | 'png';
}) => `/api/templater/${name}/${type}` + jsonToQueryString(state);
