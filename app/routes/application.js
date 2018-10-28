import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject } from '@ember/service'

export default Route.extend(ApplicationRouteMixin, {
  session: inject('session'),
  currentUser: inject(),

  renderTemplate: function(){
    this.render();
    this.render('search', {
      outlet: 'search',
      into: 'application'
    });
  },
  beforeModel() {
    return this._loadCurrentUser()
  },
  sessionAuthenticated() {
    this._super(...arguments)
    this._loadCurrentUser()
  },
  _loadCurrentUser() {
    return this.currentUser.load().then(() => {
    }).catch(() => {
      // console.log(err)
      this.session.invalidate()
    })
  }

});
