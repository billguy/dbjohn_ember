import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SloganFormComponent extends Component {
  @action submit(model) {
    this.args.submitAction(model);
  }
}
