import Route from '@ember/routing/route';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Route.extend(RouteMixin, {
  perPage: 4,
  model(params){
    return this.findPaged('post', params);
  },
  setupController: function(controller, model) {
    model.then((content) => {
      controller.set("posts", content.content);
      controller.set("content", content);
    })
  }
});
