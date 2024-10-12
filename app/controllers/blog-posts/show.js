import { action } from '@ember/object';
import { inject } from '@ember/service';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class BlogPostShowController extends Controller {
  @inject session;
  @inject flashMessages;
  @inject router;

  @tracked shouldDelete = false;

  @action
  deletePost(post) {
    post.destroyRecord().then(() => {
      this.router.transitionTo('blog-posts');
      this.shouldDelete = false;
      this.flashMessages.success(`${post.title} deleted`);
    });
  }
}
