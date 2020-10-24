import styled from 'styled-components';

import { useQuery } from '@apollo/client';
import { Column } from '~/frontkit';

import { ApolloQueryResults } from '~/components';
import ImagePreview from '~/components/images/ImagePreview';

import Buttons from './Buttons';
import { EvenmanWeeklyDigestDocument } from './queries.generated';

const Container = styled.main`
  margin-top: 10px;
`;

const ScheduleScreen: React.FC = () => {
  const queryResults = useQuery(EvenmanWeeklyDigestDocument);

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
