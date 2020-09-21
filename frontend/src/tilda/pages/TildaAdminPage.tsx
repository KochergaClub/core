import Link from 'next/link';

import { useMutation, useQuery } from '@apollo/client';
import { A, Column, Label, Row } from '@kocherga/frontkit';

import { withApollo, withStaff } from '~/apollo';
import { NextApolloPage } from '~/apollo/types';
import { ApolloQueryResults, AsyncButton, Page } from '~/components';
import Card, { CardList } from '~/components/Card';

import {
    TildaImportAllDocument, TildaImportDocument, TildaPagesForAdminDocument
} from '../queries.generated';

const TildaAdminPage: NextApolloPage = () => {
  const queryResults = useQuery(TildaPagesForAdminDocument);

  const [importAllMutation] = useMutation(TildaImportAllDocument, {
    refetchQueries: ['TildaPagesForAdmin'],
    awaitRefetchQueries: true,
  });

  const [importMutation] = useMutation(TildaImportDocument, {
    refetchQueries: ['TildaPagesForAdmin'],
    awaitRefetchQueries: true,
  });

  return (
    <Page title="Управление Tilda-страницами" menu="team">
      <Page.Title>Управление Tilda-страницами</Page.Title>
      <Page.Main>
        <Column stretch gutter={24}>
          <Row gutter={16}>
            <AsyncButton act={importAllMutation}>
              Обновить все страницы
            </AsyncButton>
            <div>
              Осторожно, эту кнопку нельзя нажимать слишком часто. Tilda
              позволяет импортировать не более 150 страниц в час, при этом мы
              делаем два запроса для каждой страницы, так что квота быстро
              истощится, если нажать кнопку несколько раз.
            </div>
          </Row>
          <ApolloQueryResults {...queryResults}>
            {({ data: { tildaPages } }) => (
              <CardList>
                {tildaPages.map(page => (
                  <Card key={page.page_id}>
                    <Row spaced>
                      <Row vCentered gutter={16}>
                        <Link href="/[...slug]" as={'/' + page.path} passHref>
                          <A>{page.title}</A>
                        </Link>
                        <Label>{page.path}</Label>
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
                  </Card>
                ))}
              </CardList>
            )}
          </ApolloQueryResults>
        </Column>
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(TildaAdminPage));
