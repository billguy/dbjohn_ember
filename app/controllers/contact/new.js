import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import { htmlSafe } from '@ember/template';

export default class ContactNewController extends Controller {
  @inject router;
  @inject flashMessages;

  @action submit(contact) {
    contact
      .save()
      .then(() => {
        this.router.ransitionTo('/');
        this.flashMessages.success('Thanks for your message');
      })
      .catch((reason) => {
        let error = reason.error
        reason.errors.forEach(e => {
          error += `<br>${e.detail}`
        })
        this.flashMessages.danger(htmlSafe(error));
      });
  }
}
