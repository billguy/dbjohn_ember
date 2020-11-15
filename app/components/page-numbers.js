import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';

export default Component.extend({

  totalPages: reads('content.meta.total_pages'),
  canStepBackward: computed('content.meta.page', function(){
    return this.get('page') > 1
  }),
  canStepForward: computed('content.meta.total_pages', function(){
    return this.get('page') < this.get('totalPages')
  }),

  didInsertElement(){
    console.log('test')
  },
  actions: {
    incrementPage(v){
      const page = this.get('page')
      const newVal = v < 0 ? page - 1 : page + 1
      this.set('page', newVal)
    }
  }
});
