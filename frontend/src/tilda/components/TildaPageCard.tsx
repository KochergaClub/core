import { parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';

import { DropdownMenu } from '~/components';
import { Card } from '~/components/cards';
import { MutationAction } from '~/components/DropdownMenu';
import HumanizedDateTime from '~/components/HumanizedDateTime';
import { A, Row } from '~/frontkit';

import {
    ImportTildaPageDocument, RemoveTildaPageDocument, TildaPagesForAdminQuery
} from '../queries.generated';

const TildaPageCard: React.FC<{
  page: TildaPagesForAdminQuery['tildaPages'][0];
}> = ({ page }) => {
  return (
    <Card>
      <Row spaced>
        <Row vCentered gutter={16}>
          <Link href={'/' + page.path} passHref>
            <A>{page.title}</A>
          </Link>
          <small>{page.path}</small>
          <small>#{page.page_id}</small>
        </Row>
        <DropdownMenu>
          <MutationAction
            mutation={ImportTildaPageDocument}
            variables={{ input: { page_id: page.page_id } }}
            title="Обновить"
            icon={MdRefresh}
          />
          <MutationAction
            mutation={RemoveTildaPageDocument}
            variables={{ input: { page_id: page.page_id } }}
            title="Удалить"
            icon={FaTrash}
            refetchQueries={['TildaPagesForAdmin']}
          />
        </DropdownMenu>
      </Row>
      <div>{page.description}</div>
      <small>
        Обновлено: <HumanizedDateTime date={parseISO(page.imported_dt)} />
      </small>
    </Card>
  );
};

export default TildaPageCard;
