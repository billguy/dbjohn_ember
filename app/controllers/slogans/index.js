import { action } from '@ember/object';
import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default class SloganIndexController extends Controller {

  @inject router;

  @action
  destroySlogan(slogan) {
    slogan.destroyRecord().then(() => {
      this.router.transitionTo('slogans.index');
      this.flashMessages.success(`${slogan.title} deleted`);
    });
  }
}
