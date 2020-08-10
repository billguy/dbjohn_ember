import ActiveModelAdapter from 'active-model-adapter';
import { computed } from '@ember/object';
import config from '../config/environment';
import { inject } from '@ember/service';

export default ActiveModelAdapter.extend({

  session: inject(),
  host: config.host,

	headers: computed('session.data.authenticated.access', function () {
    let token = this.get('session.data.authenticated.access')
    if (token)
    return {
			'Authorization': 'Bearer ' + token
		}
    return {}
  }),
});
