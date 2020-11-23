import styled from 'styled-components';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import ImagePreview from '~/components/images/ImagePreview';
import { Column } from '~/frontkit';

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
              {digest.image && digest.image_x2 && (
                <ImagePreview
                  url={digest.image.url}
                  url_x2={digest.image_x2.url}
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
