import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),
  shouldDelete: false,
  actions: {
    markerClicked(pic){
      this.transitionToRoute("pics", { queryParams: { lat: pic.lat, lng: pic.lng }})
    },
    deletePic(pic){
      pic.destroyRecord().then(() => {
        this.transitionToRoute("pics")
        this.set('shouldDelete', false)
        this.flashMessages.success(`${pic.title} deleted`)
      });
    }
  }
});
