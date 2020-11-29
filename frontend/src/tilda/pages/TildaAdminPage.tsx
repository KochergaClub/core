import { useMutation, useQuery } from '@apollo/client';

import { withApollo, withStaff } from '~/apollo';
import { NextApolloPage } from '~/apollo/types';
import { ApolloQueryResults, Page } from '~/components';
import { CardList } from '~/components/Card';
import { ShapeToValues } from '~/components/forms/types';
import { FormShapeModalButton } from '~/components/forms2';
import { AsyncButton, Column, Row } from '~/frontkit';

import TildaPageCard from '../components/TildaPageCard';
import { useImportMutation } from '../hooks';
import { TildaImportAllDocument, TildaPagesForAdminDocument } from '../queries.generated';

const ImportByIdButton: React.FC = () => {
  const importMutation = useImportMutation();

  const shape = [
    {
      type: 'number',
      name: 'ID',
    },
  ] as const;

  const post = async (values: ShapeToValues<typeof shape>) => {
    await importMutation({
      variables: { page_id: parseInt(values.ID, 10) },
    });
  };
  return (
    <FormShapeModalButton
      shape={shape}
      post={post}
      buttonName="Скачать страницу по ID"
      modalButtonName="Скачать"
      modalTitle="Скачать страницу по ID"
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
        <Column stretch gutter={24}>
          <Row gutter={16}>
            <div>
              <AsyncButton act={importAllMutation}>Обновить всё</AsyncButton>
            </div>
            <div>
              Осторожно, эту кнопку нельзя нажимать слишком часто. Tilda
              позволяет импортировать не более 150 страниц в час, при этом мы
              делаем два запроса для каждой страницы, так что квота быстро
              истощится, если нажать кнопку несколько раз.
            </div>
          </Row>
          <ImportByIdButton />
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
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(TildaAdminPage));
