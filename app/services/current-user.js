import Service from '@ember/service';
import { inject } from '@ember/service';
import { resolve } from 'rsvp';
import { isEmpty } from '@ember/utils';

export default Service.extend({
  session: inject('session'),
  store: inject(),

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

});
