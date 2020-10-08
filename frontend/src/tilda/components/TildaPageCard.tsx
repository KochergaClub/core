import { parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';

import { A, Label, Row } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';
import Card from '~/components/Card';
import HumanizedDateTime from '~/components/HumanizedDateTime';

import { useImportMutation } from '../hooks';
import { TildaPagesForAdminQuery } from '../queries.generated';

const TildaPageCard: React.FC<{
  page: TildaPagesForAdminQuery['tildaPages'][0];
}> = ({ page }) => {
  const importMutation = useImportMutation();

  return (
    <Card>
      <Row spaced>
        <Row vCentered gutter={16}>
          <Link href="/[...slug]" as={'/' + page.path} passHref>
            <A>{page.title}</A>
          </Link>
          <small>{page.path}</small>
        </Row>
        <AsyncButton
          act={() =>
            importMutation({
              variables: { page_id: page.page_id },
            })
          }
          small
        >
          Обновить
        </AsyncButton>
      </Row>
      <div>{page.description}</div>
      <small>
        Обновлено: <HumanizedDateTime date={parseISO(page.imported_dt)} />
      </small>
    </Card>
  );
};

export default TildaPageCard;
