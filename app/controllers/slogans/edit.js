import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class SloganEditController extends Controller {
  @inject router;

  @action submit(model) {
    model
      .save()
      .then(() => {
        this.router.transitionTo('slogans.index');
      })
      .catch((reason) => {
        if (reason.json) this.flashMessages.danger(reason.json.error);
      });
  }
}
