import { inject } from '@ember/service';
import Route from '@ember/routing/route';

export default class LoginRoute extends Route {
  @inject session;
  @inject currentUser;

  beforeModel() {
    if (this.currentUser) {
      this.session.invalidate(); //Logout if logged in
    }
  }
}
