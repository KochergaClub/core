import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { CommunityInitiativesFilterInput } from '~/apollo/types.generated';
import { SelectField } from '~/components/forms/SelectField';

import { statusNames } from './utils';

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
  }, [watchStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex">
      <div className="w-48">
        <SelectField
          name="status"
          title="Статус"
          form={form}
          options={
            Object.entries(statusNames) as Array<
              [keyof typeof statusNames, string]
            >
          }
        />
      </div>
    </div>
  );
};
