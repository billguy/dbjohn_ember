import Controller from '@ember/controller';
import { inject } from '@ember/service';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Controller.extend({
  session: inject('session'),
  pagedContent: pagedArray("model", { infinite: true }),

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
        pics.addObjects(c.content)
      })
    }
  }
});
