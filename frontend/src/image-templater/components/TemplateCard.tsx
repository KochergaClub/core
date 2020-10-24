import Link from 'next/link';

import { A } from '~/frontkit';

import Card from '~/components/Card';

import { TemplateFragment } from '../queries.generated';

interface Props {
  template: TemplateFragment;
}

const TemplateCard: React.FC<Props> = ({ template }) => {
  return (
    <Card>
      <Link
        href="/team/image-templater/[slug]"
        as={`/team/image-templater/${template.name}`}
        passHref
      >
        <A>{template.name}</A>
      </Link>
    </Card>
  );
};

export default TemplateCard;
