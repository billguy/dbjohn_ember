import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject } from '@ember/service'
import { task } from 'ember-concurrency';

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
    return {
      slogan: this.get('sloganTask').perform()
    }
  },
  sloganTask: task(function *(){
    let slogan = yield this.get('store').query('slogan', { per_page: 1 }).then((slogans) => {
      return slogans.get('firstObject')
    })
    return slogan;
  }),
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
