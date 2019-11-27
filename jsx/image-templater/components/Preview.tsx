import { FormState, state2link } from '../utils';
import { ImageTemplate } from '../types';

const Preview: React.FC<{ state: FormState; template: ImageTemplate }> = ({
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
