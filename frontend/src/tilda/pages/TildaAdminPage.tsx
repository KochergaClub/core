import React from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { withApollo, withStaff } from '~/apollo';
import { NextApolloPage } from '~/apollo/types';
import { useSmartMutation } from '~/common/hooks';
import { ApolloQueryResults, AsyncButtonWithConfirm, PaddedBlock, Page } from '~/components';
import { CardList } from '~/components/cards';
import { FormShapeModalButton } from '~/components/forms';
import { ShapeToValues } from '~/components/forms/types';
import { Column, Row } from '~/frontkit';

import TildaPageCard from '../components/TildaPageCard';
import {
    ImportTildaPageDocument, TildaImportAllDocument, TildaPagesForAdminDocument
} from '../queries.generated';

const ImportByIdButton: React.FC = () => {
  const importMutation = useSmartMutation(ImportTildaPageDocument, {
    expectedTypename: 'TildaPage',
    refetchQueries: ['TildaPagesForAdmin'],
  });

  const shape = [
    {
      type: 'number',
      name: 'ID',
    },
  ] as const;

  const post = async (values: ShapeToValues<typeof shape>) => {
    await importMutation({
      variables: { input: { page_id: parseInt(values.ID, 10) } },
    });
  };
  return (
    <FormShapeModalButton
      shape={shape}
      post={post}
      buttonLabel="Скачать страницу по ID"
      modalTitle="Скачать страницу по ID"
      modalSubmitLabel="Скачать"
    />
  );
};

const TildaAdminPage: NextApolloPage = () => {
  const queryResults = useQuery(TildaPagesForAdminDocument);

  const [importAllMutation] = useMutation(TildaImportAllDocument, {
    refetchQueries: ['TildaPagesForAdmin'],
    awaitRefetchQueries: true,
  });

  return (
    <Page title="Управление Tilda-страницами" menu="team">
      <Page.Title>Управление Tilda-страницами</Page.Title>
      <Page.Main>
        <PaddedBlock>
          <Column stretch gutter={24}>
            <Row gutter={16}>
              <AsyncButtonWithConfirm
                confirmText="Осторожно, эту кнопку нельзя нажимать слишком часто. Tilda позволяет импортировать не более 150 страниц в час, при этом мы делаем два запроса для каждой страницы, так что квота быстро истощится, если нажать кнопку несколько раз."
                act={importAllMutation}
              >
                Обновить всё
              </AsyncButtonWithConfirm>
              <ImportByIdButton />
            </Row>
            <ApolloQueryResults {...queryResults}>
              {({ data: { tildaPages } }) => (
                <CardList>
                  {tildaPages.map((page) => (
                    <TildaPageCard page={page} key={page.page_id} />
                  ))}
                </CardList>
              )}
            </ApolloQueryResults>
          </Column>
        </PaddedBlock>
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(TildaAdminPage));
