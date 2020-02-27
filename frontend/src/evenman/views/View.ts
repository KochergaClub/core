import { RootStore } from '../stores/RootStore';

export default interface View {
  name: string;
  root: RootStore;

  update: (props: object) => void;
}
