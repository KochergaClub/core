import { FormShape } from '~/components/forms/types';

export interface AnyViewProps<I> {
  items: I[];
  renderItem: (item: I) => React.ReactElement;
  shape: FormShape;
}

export interface EntityNames {
  plural?: string;
  genitive?: string;
}
