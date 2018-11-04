import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  session: inject('session'),
  currentUser: inject(),
  queryParams: ["q"],
  isSearching: false,
  sloganTitle: computed('slogan', function(){
    let slogan = this.get('slogan')
    if (slogan)
      return slogan.get('title')
    else
      return 'David B. John'
  }),
  actions: {
    searchClicked(){
      this.toggleProperty('isSearching')
    },
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
