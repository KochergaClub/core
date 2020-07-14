import { NextApolloPage } from '~/apollo/types';
import { Page, ApolloQueryResults, AsyncButton } from '~/components';
import { withApollo, withStaff } from '~/apollo';
import {
  useTildaPagesForAdminQuery,
  useTildaImportAllMutation,
  useTildaImportMutation,
} from '../queries.generated';
import Link from 'next/link';
import { A, Row, Label } from '@kocherga/frontkit';
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
    <Page title="Управление Tilda-страницами">
      <Page.Title>Управление Tilda-страницами</Page.Title>
      <Page.Main>
        <AsyncButton act={importAllMutation}>Обновить все страницы</AsyncButton>
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
                        importMutation({ variables: { page_id: page.page_id } })
                      }
                      small
                    >
                      Обновить
                    </AsyncButton>
                  </Row>
                </Card>
              ))}
            </CardList>
          )}
        </ApolloQueryResults>
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(TildaAdminPage));
