import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {

  @service store

  queryParams = {
    page: {
      refreshModel: true,
    },
    tags: {
      refreshModel: true,
    },
  };

  model(params) {
    return this.store.query('blog-post', params);
  }
}
