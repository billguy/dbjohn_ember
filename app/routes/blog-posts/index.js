import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    },
    tags: {
      refreshModel: true
    }
  },
  model(params){
    return this.store.query('blog-post', params)
  }
});
