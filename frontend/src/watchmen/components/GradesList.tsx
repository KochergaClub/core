import { Column } from '@kocherga/frontkit';

import Card, { CardList } from '~/components/Card';
import { ApolloQueryResults } from '~/components';

import {
  useWatchmenGradesListQuery,
  GradeFragment,
} from '../queries.generated';

const GradeItem = ({ grade }: { grade: GradeFragment }) => (
  <Card>
    <Column>
      <strong>{grade.code}</strong>
      <div>Коэффициент: x{grade.multiplier}</div>
    </Column>
  </Card>
);

const GradesList = () => {
  const gradesQueryResults = useWatchmenGradesListQuery();

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
