import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),

  actions: {
    deletePost(post) {
      post.destroyRecord().then(() => {
        this.transitionToRoute("blog-posts")
        this.flashMessages.success(`${post.title} deleted`)
      });
    }
  }
});
