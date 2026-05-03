import { action } from '@ember/object';
import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class SloganIndexController extends Controller {
  @service router;

  @action
  destroySlogan(slogan) {
    slogan.destroyRecord().then(() => {
      this.router.transitionTo('slogans.index');
      this.flashMessages.success(`${slogan.title} deleted`);
    });
  }
}
