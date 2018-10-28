import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),
  currentUser: inject(),
  queryParams: ["page", "perPage"],
  actions: {
    tagSelected(tag){
      this.set('tags', tag.name)
    },
    clearTags(){
      this.set('tags', null)
    }
  }
});
