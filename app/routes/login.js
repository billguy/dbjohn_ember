import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import { inject } from '@ember/service';

export default Route.extend(UnauthenticatedRouteMixin, {
  session: inject('session'),
  currentUser: inject(),

  beforeModel() {
    if ( this.get('currentUser') ){
      this.get('session').invalidate(); //Logout if logged in
    }
  }

});
