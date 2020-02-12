import { action, observable } from 'mobx';
import * as React from 'react';
import { observer, Provider } from 'mobx-react';

import { Main } from './Main';
import { MainStore } from './store';

import PageHeader from './PageHeader';
import styled from 'styled-components';

import registerServiceWorker from './registerServiceWorker';

interface Props {}

interface State {
  store: MainStore;
}

const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 980px;
`;

const UpdatedToast = styled.div`
  width: 80vw;
  height: 80vh;
  left: 10vw;
  top: 10vh;
  z-index: 100;
  background-color: #282828;
  color: white;
  text-align: center;
  opacity: 0.95;
  border-radius: 5px;
  border: black 1px solid;
  position: fixed;
  padding-top: 25vh;
  font-size: 1.4em;
  pointer: cursor;
`;

@observer
class App extends React.Component<Props, State> {
  @observable codeUpdated: boolean = false;

  constructor(props: Props) {
    super(props);
    this.state = {
      store: new MainStore(),
    };
    registerServiceWorker(() => this.onCodeUpdate());
  }

  @action
  onCodeUpdate() {
    this.codeUpdated = true;
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <AppContainer>
          {this.codeUpdated && (
            <UpdatedToast onClick={() => window.location.reload()}>
              Код формы обновился. Пожалуйста, <a href="/">обновите страницу</a>.
            </UpdatedToast>
          )}
          <PageHeader />
          <Main />
        </AppContainer>
      </Provider>
    );
  }
}

export default App;
