import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {

  @service currentUser;
  @service store;
  @service session;

  model() {
    return this.store.query('slogan', { per_page: 1 })
  }

  async beforeModel() {
    await this.session.setup();
    return this._loadCurrentUser();
  }

  sessionAuthenticated() {
    this._loadCurrentUser();
  }

  _loadCurrentUser() {
    return this.currentUser
      .load()
      .then(() => {})
      .catch(() => {
        this.session.invalidate();
      });
  }
}
