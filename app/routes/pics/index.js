import Route from '@ember/routing/route';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Route.extend(RouteMixin, {
  queryParams: {
    tags: {
      refreshModel: true
    },
    lat: {
      refreshModel: true
    },
    lng: {
      refreshModel: true
    }
  },
  perPage: 9,
  model: function(params) {
    return this.findPaged('pic', params)
  },

  setupController(controller, model) {
    controller.set('model', model)
    controller.set('pics', [].addObjects(model.content))
  }
});
