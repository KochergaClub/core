import { action, observable } from 'mobx';

// via https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

interface ErrorItem {
  id: string;
  text: string;
}

export class ErrorStore {
  @observable errors: ErrorItem[] = [];

  @action.bound
  removeError(id: string) {
    this.errors = this.errors.filter(e => e.id !== id);
  }

  @action.bound
  addError(text: string) {
    this.errors.push({
      text,
      id: guid(),
    });
    throw new Error(text);
  }
}
