import { useQuery } from '@apollo/client';
import { Column } from '@kocherga/frontkit';

import { ApolloQueryResults } from '~/components';
import Card, { CardList } from '~/components/Card';

import { GradeFragment, WatchmenGradesListDocument } from '../queries.generated';

const GradeItem = ({ grade }: { grade: GradeFragment }) => (
  <Card>
    <Column>
      <strong>{grade.code}</strong>
      <div>Коэффициент: x{grade.multiplier}</div>
    </Column>
  </Card>
);

const GradesList = () => {
  const gradesQueryResults = useQuery(WatchmenGradesListDocument);

  return (
    <div>
      <h2>Грейды</h2>
      <ApolloQueryResults {...gradesQueryResults}>
        {({ data: { grades } }) => (
          <CardList>
            {grades.map(grade => (
              <GradeItem grade={grade} key={grade.id} />
            ))}
          </CardList>
        )}
      </ApolloQueryResults>
    </div>
  );
};

export default GradesList;
