import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({

  session: inject(),
  flashMessages: inject(),
  shouldDelete: false,

  actions: {
    deletePost(post) {
      post.destroyRecord().then(() => {
        this.transitionToRoute("blog-posts")
        this.set('shouldDelete', false)
        this.flashMessages.success(`${post.title} deleted`)
      });
    }
  }
});
