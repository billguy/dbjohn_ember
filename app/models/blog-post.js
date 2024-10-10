import Model, { attr } from '@ember-data/model';
import PostModel from './post';
import config from '../config/environment';

export default class BlogPostModel extends PostModel {
  @attr('boolean', { defaultValue: true }) blog;

  get discusIdentifier() {
    return `${config.siteURL}/blog-posts/${this.permalink}`;
  }
}
