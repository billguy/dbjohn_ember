import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),
  actions: {
    markerClicked(pic){
      this.transitionToRoute("pics", { queryParams: { lat: pic.lat, lng: pic.lng }})
    },
    deletePic(pic){
      pic.destroyRecord().then(() => {
        this.transitionToRoute("pics")
        this.flashMessages.success(`${pic.title} deleted`)
      });
    }
  }
});
