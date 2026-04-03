import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class PicShowController extends Controller {
  @service session;
  @service router;
  @service flashMessages;

  @tracked shouldDelete = false;

  @action
  markerClicked(pic) {
    this.router.transitionTo('pics', {
      queryParams: { lat: pic.lat, lng: pic.lng },
    });
  }

  @action
  deletePic(pic) {
    pic.destroyRecord().then(() => {
      this.router.transitionTo('pics.index');
      this.shouldDelete = false;
      this.flashMessages.success(`${pic.title} deleted`);
    });
  }

  @action
  setShouldDelete(value) {
    this.shouldDelete = value;
  }

  @action
  didInsert() {
    if (this.model.nextPermalink == null || this.model.prevPermalink == null)
      this.model.reload();
  }
}
