import AuthenticatedRoute from '../authenticated';
import { inject as service } from '@ember/service';

export default class NewRoute extends AuthenticatedRoute{

  @service session

  model() {
    return this.store.createRecord('slogan');
  }
}
