import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model: function(){
    return this.store.createRecord('pic');
  },

  setupController(controller, model) {
    controller.set('model', model)
    model.set('tagList', [])
  }
});
