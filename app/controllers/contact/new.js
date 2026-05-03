import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';

export default class ContactNewController extends Controller {
  @service router;
  @service flashMessages;

  @action
  setRecaptchaResponse(response) {
    this.model.response = response;
  }

  @action submit(contact) {
    return contact
      .save()
      .then(() => {
        this.router.transitionTo('/');
        this.flashMessages.success('Thanks for your message');
      })
      .catch((reason) => {
        let error = reason.error;
        reason.errors.forEach((e) => {
          const field = e.source.pointer.substring(
            e.source.pointer.lastIndexOf('/') + 1,
          );
          error += `<br>${field}: ${e.detail}`;
        });
        this.flashMessages.danger(htmlSafe(error));
      });
  }
}
