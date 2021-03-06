export interface Defaults {
  title?: string;
  basename?: string;
  collectionId?: string;
}

// common type for Control actions
export interface SetImageIdProps {
  setImageId: (id: string) => Promise<unknown>;
}
