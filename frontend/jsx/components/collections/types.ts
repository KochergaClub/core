import { FormShape } from '~/components/forms/types';

export interface AnyViewProps<I> {
  items: I[];
  shape: FormShape;
  renderItem?: (item: I) => React.ReactElement;
  getId?: (item: I) => string | number;
}

export interface EntityNames {
  plural?: string;
  genitive?: string;
}
