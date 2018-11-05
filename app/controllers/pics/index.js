import Controller from '@ember/controller';
import { inject } from '@ember/service';
import pagedArray from 'ember-cli-pagination/computed/paged-array';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';

export default Controller.extend({
  session: inject('session'),
  isLoading: reads('model.pics.isRunning'),

  content: reads('model.pics.value'),

  tagList: computed('content', function(){
    let tagList = this.get('content.meta.tag_list')
    return tagList
  }),
  pics: computed('content', function(){
    let content = this.get('content')
    if (content){
      let pics = content.get('content')
      return [].addObjects(pics)
    } else
      return []
  }),

  pagedContent: pagedArray("model.pics.value", { infinite: true }),

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
