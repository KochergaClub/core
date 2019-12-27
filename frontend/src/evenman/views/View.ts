import { RootStore } from '../stores/RootStore';

export default interface View {
  name: string;
  toPath: string;
  root: RootStore;

  update: (props: object) => void;
}
