import { FormState, state2link } from '../utils';
import { TemplateFragment } from '../queries.generated';

const Preview: React.FC<{ state: FormState; template: TemplateFragment }> = ({
  state,
  template,
}) => {
  const src = state2link({
    name: template.name,
    state,
    type: 'html',
  });

  const { width, height } = template.sizes;

  return <iframe src={src} style={{ width, height, border: 0 }} />;
};

export default Preview;
