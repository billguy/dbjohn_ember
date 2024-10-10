import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class NewRoute extends Route {

  @inject store

  model() {
    return this.store.createRecord('contact');
  }
}
