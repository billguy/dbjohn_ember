import ActiveModelAdapter from 'active-model-adapter';
import config from '../config/environment';
import { inject } from '@ember/service';

export default class Application extends ActiveModelAdapter {
  @inject session
  host = config.host;

  get headers() {
    let token = this.get('session.data.authenticated.access');
    if (token)
      return {
        Authorization: 'Bearer ' + token,
      };
    else return {};
  }
}
