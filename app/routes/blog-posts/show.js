import Route from '@ember/routing/route';

export default Route.extend({
  model(params){
    return this.store.findRecord('blog-post', params.id, { reload: true });
  }
});
