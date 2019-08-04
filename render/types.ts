import { User } from '../jsx/common/types';

export interface Store {
  screenName: string;
  props: any;
  user: User;
  csrfToken: string;
}
