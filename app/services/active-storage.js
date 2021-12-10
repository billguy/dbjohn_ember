import ActiveStorage from '@algonauti/ember-active-storage/services/active-storage';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default ActiveStorage.extend({

  session: service(),

  headers: computed('session.isAuthenticated', function() {
    let accessToken = this.get('session.data.authenticated.access')
    return {
			'Authorization': `Bearer ${accessToken}`,
		};
  })

});
