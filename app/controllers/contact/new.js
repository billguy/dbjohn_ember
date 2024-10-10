import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class ContactNewController extends Controller {

  @inject router;

  @action submit(contact) {
    contact
      .save()
      .then(() => {
        this.trouter.ransitionTo('/');
        this.flashMessages.success('Thanks for your message');
      })
      .catch((reason) => {
        if (reason.json) this.flashMessages.danger(reason.json.error);
      });
  }
}
