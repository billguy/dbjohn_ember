import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),
  currentUser: inject(),
  queryParams: ["page", "perPage"],
  page: 1,
  actions: {
    tagSelected(tag){
      this.set('tags', tag.name)
    },
    clearTags(){
      this.set('tags', null)
    }
  }
});
