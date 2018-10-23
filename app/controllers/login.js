import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import Login from '../models/login';

export default Controller.extend({
  session: inject('session'),
  flashMessages: inject(),
  login: computed(function() {
    return Login.create(
      getOwner(this).ownerInjection()
    );
  }),
  actions: {
    authenticate: function() {
      let email = this.get('login.email')
      let password = this.get('login.password')
      const authenticator = 'authenticator:jwt';

      this.session.authenticate(authenticator, { email: email, password: password}).then(() => {
        this.transitionToRoute('index')
      }).catch((reason) => {
        if (reason.json)
          this.flashMessages.danger(reason.json.error)
      });
    }
  }
});
