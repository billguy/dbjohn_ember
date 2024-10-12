import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class AboutRoute extends Route {
  @inject store;

  model() {
    return this.store.findRecord('post', 'about');
  }
}
