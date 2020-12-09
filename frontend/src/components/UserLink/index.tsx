import { UserFragment } from './fragments.generated';

type Props = {
  user: UserFragment;
};

export const UserLink: React.FC<Props> = ({ user }) => {
  return (
    <div>
      {user.first_name
        ? `${user.first_name} ${user.last_name}`
        : `Анон#${user.id}`}
    </div>
  );
};
