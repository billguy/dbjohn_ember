import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { later } from '@ember/runloop';

export default Controller.extend({
  session: inject('session'),
  currentUser: inject(),
  queryParams: ["q"],
  isSearching: false,
  slogan: reads('model.slogan.value'),
  sloganTitle: computed('slogan', function(){
    let slogan = this.get('slogan')
    if (slogan){
      later(this, function(){
        this.setSloganTitle()
      }, 2000);
    }
    return 'David B. John'
  }),
  setSloganTitle(){
    let slogan = this.get('slogan')
    return this.set('sloganTitle', slogan.title)
  },
  actions: {
    searchClicked(){
      this.toggleProperty('isSearching')
    },
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
