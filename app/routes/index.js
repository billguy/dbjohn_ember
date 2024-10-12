import Route from '@ember/routing/route';
import { task } from 'ember-concurrency';
import { inject } from '@ember/service';

export default class IndexRoute extends Route {
  @inject store;

  model() {
    return {
      pics: this.picTask.perform(),
      blogs: this.blogsTask.perform(),
    };
  }

  @(task(function* () {
    const pics = yield this.store.query('pic', { per_page: 1 });
    this.controller.pics = pics;
  }).restartable())
  picTask;

  @(task(function* () {
    const blogs = yield this.store.query('blog-post', { per_page: 2 });
    this.controller.blogs = blogs;
  }).restartable())
  blogsTask;
}
