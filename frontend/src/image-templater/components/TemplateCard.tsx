import Link from 'next/link';

import Card from '~/components/Card';
import { A } from '~/frontkit';

import { TemplateFragment } from '../queries.generated';
import { imageTemplateDetailsRoute } from '../routes';

interface Props {
  template: TemplateFragment;
}

const TemplateCard: React.FC<Props> = ({ template }) => {
  return (
    <Card>
      <Link href={imageTemplateDetailsRoute(template.name)} passHref>
        <A>{template.name}</A>
      </Link>
    </Card>
  );
};

export default TemplateCard;
