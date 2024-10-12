import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  beforeModel() {
    this.controllerFor('pics.index').reloadPics();
  }
}
