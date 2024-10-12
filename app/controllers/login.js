import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { getOwner } from '@ember/application';
import { action } from '@ember/object';
import Login from '../models/login';

export default class Loginontroller extends Controller {
  @inject session;
  @inject flashMessages;
  @inject router;

  login() {
    return Login.create(getOwner(this).ownerInjection());
  }

  @action authenticate() {
    const email = this.get('login.email');
    const password = this.get('login.password');
    const authenticator = 'authenticator:jwt';
    this.session
      .authenticate(authenticator, { email: email, password: password })
      .then(() => {
        this.router.transitionTo('index');
        this.flashMessages.info('Logged in');
      })
      .catch((reason) => {
        this.flashMessages.danger(reason.statusText);
      });
  }
}
