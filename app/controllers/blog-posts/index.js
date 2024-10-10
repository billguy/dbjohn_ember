import { action } from '@ember/object';
import { inject } from '@ember/service';
import Controller from '@ember/controller';

export default class BlogPostIndexController extends Controller {

  @inject session;
  @inject currentUser;

  queryParams = ['page', 'perPage'];
  page = 1;

  @action
  tagSelected(tag) {
    this.set('tags', tag.name);
  }

  @action
  clearTags() {
    this.set('tags', null);
  }
}
