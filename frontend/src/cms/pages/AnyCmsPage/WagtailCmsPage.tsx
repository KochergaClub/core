import { useEffect } from 'react';

import { useWagtailPageReducer, WagtailPageContext } from '../../contexts';
import { getComponentByTypename } from '../../wagtail-utils';

const WagtailCmsPage: React.FC<{ page: any }> = ({ page }) => {
  // We need to have control over page because pages can be editable.
  // But this creates a problem: on navigation NextJS will replace the page prop and we need to handle it correctly.
  const [state, dispatch] = useWagtailPageReducer({
    page,
  });

  useEffect(() => {
    dispatch({
      type: 'NAVIGATE',
      payload: page,
    });
  }, [dispatch, page]);

  const typename = state.page.__typename;

  const Component = getComponentByTypename(typename);
  if (!Component) {
    // TODO - prettier error
    return <div>Внутренняя ошибка: страница неизвестного типа ${typename}</div>;
  }

  return (
    <WagtailPageContext.Provider value={{ state, dispatch }}>
      <Component page={state.page} />
    </WagtailPageContext.Provider>
  );
};

export default WagtailCmsPage;
