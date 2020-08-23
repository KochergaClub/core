import styled from 'styled-components';

import { Column } from '@kocherga/frontkit';

import { ApolloQueryResults } from '~/components';

import ImagePreview from '../common/ImagePreview';
import Buttons from './Buttons';
import { useEvenmanWeeklyDigestQuery } from './queries.generated';

const Container = styled.main`
  margin-top: 10px;
`;

const ScheduleScreen: React.FC = () => {
  const queryResults = useEvenmanWeeklyDigestQuery();

  return (
    <Container>
      <Column centered>
        <ApolloQueryResults {...queryResults} size="block">
          {({ data: { digest } }) => (
            <>
              {digest.image && (
                <ImagePreview
                  url={digest.image.url}
                  link={digest.image.original_image.url}
                />
              )}
              <Buttons digest={digest} />
            </>
          )}
        </ApolloQueryResults>
      </Column>
    </Container>
  );
};

export default ScheduleScreen;
