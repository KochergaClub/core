import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Row, HR } from '@kocherga/frontkit';

import { useDispatch } from '~/common/hooks';
import { AsyncButton } from '~/components';
import { Collection } from '~/components/collections';
import { AnyViewProps, EntityNames } from '~/components/collections/types';
import { FormShape } from '~/components/forms/types';

import { PagedResourceFeature } from '~/redux/features/pagedResource';

interface PagerProps<E> {
  feature: PagedResourceFeature<any, E>;
}

function Pager<E>(props: PagerProps<E>) {
  const pager = useSelector(props.feature.selectors.pager);
  const { loadPage } = props.feature.thunks;

  const dispatch = useDispatch();

  const previous = useCallback(async () => {
    if (!pager) {
      return;
    }
    await dispatch(loadPage(pager.page - 1));
  }, [dispatch, loadPage, pager]);

  const next = useCallback(async () => {
    if (!pager) {
      return;
    }
    await dispatch(loadPage(pager.page + 1));
  }, [dispatch, loadPage, pager]);

  if (!pager) {
    return null; // not loaded yet
  }

  if (!pager.hasNext && !pager.hasPrevious) {
    return null; // everything fits on a single page
  }

  return (
    <div>
      <HR />
      <Row spaced>
        <AsyncButton act={previous} disabled={!pager.hasPrevious}>
          &larr; Предыдущая страница
        </AsyncButton>
        <div>Страница {pager.page}</div>
        <AsyncButton act={next} disabled={!pager.hasNext}>
          Cледующая страница &rarr;
        </AsyncButton>
      </Row>
    </div>
  );
}

interface Props<T, A extends {}> {
  feature: PagedResourceFeature<any, T>;
  names: EntityNames;
  add?: {
    shape: FormShape;
    cb: (values: A) => Promise<void>;
  };
  view?: React.ElementType<AnyViewProps<T>>;
}

function PagedReduxCollection<T, A extends {}>(props: Props<T, A>) {
  const items = useSelector(props.feature.selectors.asList);

  return (
    <div>
      <Collection
        names={props.names}
        items={items}
        add={props.add}
        view={props.view}
      />
      <Pager feature={props.feature} />
    </div>
  );
}

export default PagedReduxCollection;
