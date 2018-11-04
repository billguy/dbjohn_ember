import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject } from '@ember/service'
import { later } from '@ember/runloop';

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
  model(){
    return this.store.query('slogan', { per_page: 1 }).then((slogans) => {
      return slogans.get('firstObject')
    })
  },
  beforeModel() {
    return this._loadCurrentUser()
  },
  setupController(controller, model) {
    later(this, function(){
      controller.set('slogan', model);
    }, 2000);
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
