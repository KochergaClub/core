import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
    CommunityInitiativesFilterInput, CommunityInitiativeStatus
} from '~/apollo/types.generated';
import { SelectField } from '~/components/forms/SelectField';

type Props = {
  filter: CommunityInitiativesFilterInput;
  onChange: (filter: CommunityInitiativesFilterInput) => void;
};

export const InitiativesFilterToolbar: React.FC<Props> = ({
  filter,
  onChange,
}) => {
  const form = useForm({
    defaultValues: {
      status: filter.status,
    },
  });

  const watchStatus = form.watch('status');

  useEffect(() => {
    onChange({
      status: watchStatus || null,
    });
  }, [watchStatus]);

  return (
    <div className="flex">
      <div className="w-48">
        <SelectField
          name="status"
          title="Статус"
          form={form}
          options={[
            [CommunityInitiativeStatus.Active, 'активный'],
            [CommunityInitiativeStatus.Inactive, 'неактивный'],
          ]}
        />
      </div>
    </div>
  );
};
