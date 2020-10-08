import { useMutation } from '@apollo/client';

import { TildaImportDocument } from './queries.generated';

export const useImportMutation = () => {
  const [importMutation] = useMutation(TildaImportDocument, {
    refetchQueries: ['TildaPagesForAdmin'],
    awaitRefetchQueries: true,
  });
  return importMutation;
};
