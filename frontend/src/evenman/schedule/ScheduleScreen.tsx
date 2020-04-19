import styled from 'styled-components';

import { Column } from '@kocherga/frontkit';

import { ApolloQueryResults } from '~/components';

import { ImagePreview } from '../ImageDropzone';
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
        <ApolloQueryResults {...queryResults}>
          {({ data: { digest } }) => (
            <>
              {digest.image && <ImagePreview url={digest.image.url} />}
              <Buttons digest={digest} />
            </>
          )}
        </ApolloQueryResults>
      </Column>
    </Container>
  );
};

export default ScheduleScreen;
