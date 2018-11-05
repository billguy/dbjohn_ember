import Route from '@ember/routing/route';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { task } from 'ember-concurrency';

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

  model(params){
    return {
      pics: this.get('picsTask').perform(params)
    }
  },
  picsTask: task(function *(params){
    let pics = yield this.findPaged('pic', params)
    return pics;
  })
});
