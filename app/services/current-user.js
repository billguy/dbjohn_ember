import Service from '@ember/service';
import { inject } from '@ember/service';
import { resolve } from 'rsvp';
import { isEmpty } from '@ember/utils';
import config from '../config/environment';
import { readOnly } from '@ember/object/computed';

export default Service.extend({
  session: inject('session'),
  store: inject(),
  cableService: inject('cable'),

  consumer: null,

  isConnecting: readOnly('consumer.isConnecting'), // Flag indicating a connection is being attempted
  nextConnectionAt: readOnly('consumer.nextConnectionAt'), // Milliseconds until the next connection attempt

  load() {
    let userId = this.get('session.data.authenticated.user_id');
    if (!isEmpty(userId)) {
      return this.store.findRecord('user', userId).then((user) => {
        this.setupConsumer()
        this.set('user', user);
      });
    } else {
      return resolve();
    }
  },

  setupConsumer(){
    let accessToken = this.get('session.data.authenticated.access')
    var consumer = this.cableService.createConsumer(`${config.cableHost}?access_token=${accessToken}`)
    this.set('consumer', consumer)
  }

});
