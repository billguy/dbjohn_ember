import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class PicsIndexController extends Controller {

  @service inViewport
  @service session
  @service store
  @service inViewport

  queryParams = ['tags', 'lat', 'lng']

  @tracked pics = []
  @tracked tagList = []
  @tracked isLoaded = false

  @tracked canLoadMore = true
  @tracked currentPic = false
  @tracked page = 0

  @reads('picsTask.isRunning') isLoading

  get params(){
    return {
      tags: this.get('tags'),
      lat: this.get('lat'),
      lng: this.get('lng'),
      page: this.get('page'),
      per_page: 9
    }
  }

  @(task(function * (params) {
    const records = yield this.store.query('pic', params)
    this.set('isLoaded', true)
    this.get('pics').pushObjects(records.toArray())
    this.set('tagList', records.get('meta.tag_list'))
    const totalPages = records.get('meta.total_pages')
    if (this.get('page') == totalPages)
      this.set('canLoadMore', false)
    }).restartable()) picsTask

  @action tagSelected(tag){
    this.set('tags', tag.name)
    this.reloadPics()
  }

  @action clearTags(){
    this.set('tags', null)
    this.reloadPics()
  }

  reloadPics(){
    this.set('page', 0)
    this.set('canLoadMore', true)
    this.get('pics').clear()
    this.set('isLoaded', false)
    this.loadPics()
  }

  loadPics(){
    this.incrementProperty('page')
    const task = this.get('picsTask')
    const params = this.get('params')
    task.perform(params)
  }

  didInsertElement() {
    set(this, 'viewportSpy', true)
  }

  @action setupInViewport(){
    const loader = document.getElementById('load-next')
    const viewportTolerance = { bottom: 200 }
    const { onEnter } = this.inViewport.watchElement(loader, { viewportTolerance })
    onEnter(this.didEnterViewport.bind(this))
  }

  didEnterViewport() {
    console.log('loadNext')
    if (this.canLoadMore){
      this.loadPics()
    }
  }

  willDestroy() {
    const loader = this.elementId
    this.inViewport.stopWatching(loader)
    super.willDestroy(...arguments)
  }

}
