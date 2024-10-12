import { reads } from '@ember/object/computed';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked pics = [];
  @tracked blogs = [];

  @reads('pics.firstObject') pic;

  get isLoaded() {
    return this.pics.length && this.blogs.length;
  }
}
