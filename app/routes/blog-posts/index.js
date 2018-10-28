import Route from '@ember/routing/route';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Route.extend(RouteMixin, {
  queryParams: {
    tags: {
      refreshModel: true
    }
  },
  perPage: 4,
  model(params){
    return this.findPaged('blog-post', params)
  }
});
