import { observable } from 'mobx';

interface Field {
  name: string;
  type: string;
}

interface Sizes {
  width: number;
  height: number;
}

interface Schema {
  fields: [Field];
}

interface TemplateJSON {
  name: string;
  schema: Schema;
  sizes: Sizes;
}

export default class ImageTemplate {
  @observable name: string;
  @observable schema: Schema;
  @observable sizes: Sizes;

  constructor(json: TemplateJSON) {
    this.name = json.name;
    this.schema = json.schema as Schema;
    this.sizes = json.sizes as Sizes;
  }
}
