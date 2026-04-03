import Service, { service } from '@ember/service';
import { resolve } from 'rsvp';
import { isEmpty } from '@ember/utils';

export default class CurrentUserService extends Service {
  @service session;
  @service store;

  load() {
    let userId = this.get('session.data.authenticated.user_id');
    if (!isEmpty(userId)) {
      return this.store.findRecord('user', userId).then((user) => {
        this.set('user', user);
      });
    } else {
      return resolve();
    }
  }
}
