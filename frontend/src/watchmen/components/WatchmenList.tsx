import { useState, useCallback } from 'react';
import styled from 'styled-components';

import Link from 'next/link';

import { FaEdit } from 'react-icons/fa';

import { A, Row, Button, Label } from '@kocherga/frontkit';

import { usePermissions } from '~/common/hooks';
import Card, { CardList } from '~/components/Card';
import { AsyncButton, ApolloQueryResults } from '~/components';

import {
  GradeFragment,
  WatchmanFragment,
  useWatchmenWatchmenListQuery,
  useWatchmenSetWatchmanPriorityMutation,
  useWatchmenSetWatchmanGradeMutation,
} from '../queries.generated';

import PickGradeModal from './PickGradeModal';
import AddWatchman from './AddWatchman';

const priority2name: { [k: number]: string } = {
  1: 'Регулярный админ',
  2: 'Эпизодический админ',
  3: 'Не админ',
};

const FixedRow = styled(Row)`
  align-items: center;
`;

const WatchmanPriorityButton: React.FC<{
  watchman: WatchmanFragment;
  priority: number;
}> = ({ watchman, priority, children }) => {
  const [setPriorityMutation] = useWatchmenSetWatchmanPriorityMutation({
    refetchQueries: ['WatchmenWatchmenList'],
    awaitRefetchQueries: true,
  });

  const cb = useCallback(async () => {
    await setPriorityMutation({
      variables: {
        params: {
          watchman_id: watchman.id,
          priority,
        },
      },
      awaitRefetchQueries: true,
    });
  }, [watchman, priority, setPriorityMutation]);

  if (watchman.priority === priority) {
    return null;
  }

  return (
    <AsyncButton small act={cb}>
      {children}
    </AsyncButton>
  );
};

const WatchmanItem = ({ watchman }: { watchman: WatchmanFragment }) => {
  const [canManage] = usePermissions(['watchmen.manage']);
  const [askingForGrade, setAskingForGrade] = useState(false);

  const [setGradeMutation] = useWatchmenSetWatchmanGradeMutation({
    refetchQueries: ['WatchmenWatchmenList'],
    awaitRefetchQueries: true,
  });

  const askForGrade = useCallback(() => {
    setAskingForGrade(true);
  }, []);

  const stopAskingForGrade = useCallback(() => {
    setAskingForGrade(false);
  }, []);

  const pickGrade = useCallback(
    async (grade: GradeFragment) => {
      await setGradeMutation({
        variables: {
          params: {
            watchman_id: watchman.id,
            grade_id: grade.id,
          },
        },
      });
      stopAskingForGrade();
    },
    [stopAskingForGrade, setGradeMutation, watchman.id]
  );

  return (
    <Card>
      <strong>
        <Link
          href="/team/staff/[id]"
          as={`/team/staff/${watchman.member.id}`}
          passHref
        >
          <A>{watchman.member.short_name}</A>
        </Link>
      </strong>
      <Row>
        <FixedRow>
          <Label>Грейд:</Label>{' '}
          <strong>{watchman.grade ? watchman.grade.code : 'нет'}</strong>
        </FixedRow>
        {canManage && (
          <>
            <Button small onClick={askForGrade}>
              <FaEdit /> Редактировать
            </Button>
            {askingForGrade && (
              <PickGradeModal
                watchman={watchman}
                close={stopAskingForGrade}
                pick={pickGrade}
              />
            )}
          </>
        )}
      </Row>
      <Row>
        <FixedRow gutter={8}>
          <Label>Приоритет:</Label>
          <div>{priority2name[watchman.priority]}</div>
        </FixedRow>
        {canManage && (
          <Row>
            <WatchmanPriorityButton watchman={watchman} priority={1}>
              Сделать регулярным
            </WatchmanPriorityButton>
            <WatchmanPriorityButton watchman={watchman} priority={2}>
              Сделать эпизодическим
            </WatchmanPriorityButton>
            <WatchmanPriorityButton watchman={watchman} priority={3}>
              Не админит никогда
            </WatchmanPriorityButton>
          </Row>
        )}
      </Row>
    </Card>
  );
};

const WatchmenSublist: React.FC<{
  watchmen: WatchmanFragment[];
  title: string;
}> = ({ watchmen, title }) => {
  if (!watchmen.length) {
    return null;
  }
  return (
    <section>
      <h3>{title}</h3>
      <CardList>
        {watchmen.map(watchman => (
          <WatchmanItem watchman={watchman} key={watchman.id} />
        ))}
      </CardList>
    </section>
  );
};

const WatchmenListResults: React.FC<{ watchmen: WatchmanFragment[] }> = ({
  watchmen,
}) => {
  const firstPriorityWatchmen = watchmen.filter(w => w.priority === 1);
  const secondPriorityWatchmen = watchmen.filter(w => w.priority === 2);
  const thirdPriorityWatchmen = watchmen.filter(w => w.priority === 3);

  return (
    <div>
      <WatchmenSublist
        watchmen={firstPriorityWatchmen}
        title="Регулярные админы"
      />
      <WatchmenSublist
        watchmen={secondPriorityWatchmen}
        title="Эпизодические админы"
      />
      <WatchmenSublist watchmen={thirdPriorityWatchmen} title="Не админы" />
    </div>
  );
};

const WatchmenList = () => {
  const queryResults = useWatchmenWatchmenListQuery({
    fetchPolicy: 'network-only',
  });

  const [canManage] = usePermissions(['watchmen.manage']);

  return (
    <div>
      <Row vCentered>
        <h2>Админы</h2>
        {canManage && <AddWatchman />}
      </Row>
      <ApolloQueryResults {...queryResults}>
        {({ data: { watchmen } }) => (
          <WatchmenListResults watchmen={watchmen} />
        )}
      </ApolloQueryResults>
    </div>
  );
};

export default WatchmenList;
