import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AboutRoute extends Route {
  @service store;

  model() {
    return this.store.findRecord('post', 'about');
  }
}
