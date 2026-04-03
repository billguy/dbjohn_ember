import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class BlogPostShowController extends Controller {
  @service session;
  @service flashMessages;
  @service router;

  @tracked shouldDelete = false;

  @action
  setShouldDelete(value) {
    this.shouldDelete = value;
  }

  @action
  deletePost(post) {
    post.destroyRecord().then(() => {
      this.router.transitionTo('blog-posts');
      this.shouldDelete = false;
      this.flashMessages.success(`${post.title} deleted`);
    });
  }
}
