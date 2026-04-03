import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class BlogPostIndexController extends Controller {
  @service session;
  @service currentUser;

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
