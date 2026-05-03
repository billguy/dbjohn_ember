import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class SloganEditController extends Controller {
  @service router;

  @action submit(model) {
    return model
      .save()
      .then(() => {
        this.router.transitionTo('slogans.index');
      })
      .catch((reason) => {
        if (reason.json) this.flashMessages.danger(reason.json.error);
      });
  }
}
