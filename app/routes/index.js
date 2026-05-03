import Route from '@ember/routing/route';
import { task } from 'ember-concurrency';
import { service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;

  model() {
    return {
      pics: this.picTask.perform(),
      blogs: this.blogsTask.perform(),
    };
  }

  picTask = task({ restartable: true }, async () => {
    const pics = await this.store.query('pic', { per_page: 1 });
    this.controller.pics = pics;
  });

  blogsTask = task({ restartable: true }, async () => {
    const blogs = await this.store.query('blog-post', { per_page: 2 });
    this.controller.blogs = blogs;
  });
}
