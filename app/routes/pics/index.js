import Route from '@ember/routing/route';
import { task } from 'ember-concurrency';

export default Route.extend({

  model(){
    return {
      pics: this.get('picsTask')
    }
  },

  setupController(controller){
    controller.set('picsTask', this.get('picsTask'))
    controller.loadPics()
  },

  picsTask: task(function *(params){
    const records = yield this.store.query('pic', params)
    const controller = this.get('controller')
    controller.get('pics').pushObjects(records.toArray())
    controller.set('isLoading', false)
    controller.set('tagList', records.get('meta.tag_list'))
    const totalPages = records.get('meta.total_pages')
    if (controller.get('page') == totalPages)
      controller.set('canLoadMore', false)
  }).restartable()

});
