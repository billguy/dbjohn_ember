import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  flashMessages: inject(),
  router: inject(),
  actions: {
    submit(model) {
      return model.save().then(()=>{
        this.router.transitionTo('blog-posts.show', model.id)
      }).catch((reason) => {
        if (reason.json)
          this.flashMessages.danger(reason.json.error)
      });
    },
    addTag(newTag) {
      this.get('model.tagList').addObject(newTag);
    },
    removeTagAtIndex(index) {
      this.get('model.tagList').removeAt(index);
    }
  }
});
