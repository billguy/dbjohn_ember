import AuthenticatedRoute from '../authenticated';
import { inject as service } from '@ember/service';

export default class NewRoute extends AuthenticatedRoute {

  @service store

  model() {
    return this.store.createRecord('pic');
  }

  setupController(controller, model) {
    controller.set('model', model);
    model.set('tagList', []);
  }
}
