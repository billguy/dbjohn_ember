import AuthenticatedRoute from '../authenticated';
import { inject as service } from '@ember/service';

export default class EditRoute extends AuthenticatedRoute {
  @service store;

  model(params) {
    return this.store.findRecord('slogan', params.id);
  }
}
