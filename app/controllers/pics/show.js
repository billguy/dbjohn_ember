import { action } from '@ember/object';
import { inject } from '@ember/service';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class PicShowController extends Controller {

  @inject session;
  @inject router;
  @inject flashMessages

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
      this.shouldDelete = false
      this.flashMessages.success(`${pic.title} deleted`);
    });
  }

  @action
  didInsert(){
    if (this.model.nextPermalink == null || this.model.prevPermalink == null)
      this.model.reload()
  }

}
