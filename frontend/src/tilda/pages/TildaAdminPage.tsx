import { NextApolloPage } from '~/apollo/types';
import { Page, ApolloQueryResults, AsyncButton } from '~/components';
import { withApollo, withStaff } from '~/apollo';
import {
  useTildaPagesForAdminQuery,
  useTildaImportAllMutation,
  useTildaImportMutation,
} from '../queries.generated';
import Link from 'next/link';
import { A, Row, Column, Label } from '@kocherga/frontkit';
import Card, { CardList } from '~/components/Card';

const TildaAdminPage: NextApolloPage = () => {
  const queryResults = useTildaPagesForAdminQuery();

  const [importAllMutation] = useTildaImportAllMutation({
    refetchQueries: ['TildaPagesForAdmin'],
    awaitRefetchQueries: true,
  });

  const [importMutation] = useTildaImportMutation({
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
