import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),
  currentUser: inject(),
  queryParams: ["q"],
  isSearching: false,
  actions: {
    searchClicked(){
      this.toggleProperty('isSearching')
    }
  }
});
