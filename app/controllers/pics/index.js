import Controller from '@ember/controller';
import { inject } from '@ember/service';
import pagedArray from 'ember-cli-pagination/computed/paged-array';
import { computed } from '@ember/object';

export default Controller.extend({
  session: inject('session'),

  pagedContent: pagedArray("model", { infinite: true }),
  pics: computed(function(){
    let model = this.get('model')
    return [].addObjects(model.content)
  }),

  actions: {
    tagSelected(tag){
      this.set('tags', tag.name)
    },
    clearTags(){
      this.set('tags', null)
    },
    loadNext() {
      let pics = this.get('pics')
      this.get('pagedContent').loadNextPage().then((c)=>{
        let newPics = pics.addObjects(c.content)
        this.set('pics', newPics)
        this.set('loadedMore', true)
      })
    }
  }
});
