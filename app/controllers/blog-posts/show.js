import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),

  deletePost: null,

  actions: {
    setDeletePost() {
      this.set('deletePost', true);
    },
    cancelDeletingPost() {
      console.log('cancelDeletingPost')
      this.set('deletePost', null);
    },
    deletePost(post) {
      console.log('deletePost')
      post.destroyRecord().then(() => {
        this.transitionToRoute("blog-posts")
        this.flashMessages.success(`${post.title} deleted`)
      });
    }
  }
});
