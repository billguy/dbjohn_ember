import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PicsIndexController extends Controller {

  @service inViewport
  @service session

  queryParams = ['tags', 'lat', 'lng']

  @tracked page = 0
  @computed('tags','lat','lng', 'page')
  get params(){
    return {
      tags: this.get('tags'),
      lat: this.get('lat'),
      lng: this.get('lng'),
      page: this.get('page'),
      per_page: 9
    }
  }

  @tracked pics = []
  @tracked tagList = []

  canLoadMore = true
  isLoading = true
  currentPic = false

  @action
  tagSelected(tag){
    this.set('tags', tag.name)
    this.clearParams()
  }

  @action
  clearTags(){
    this.set('tags', null)
    this.clearParams()
  }

  clearParams(){
    this.set('page', 0)
    this.set('canLoadMore', true)
    this.set('isLoading', true)
    this.get('pics').clear()
    this.loadPics()
  }

  loadPics(){
    this.incrementProperty('page')
    const task = this.get('picsTask')
    const params = this.get('params')
    task.perform(params)
  }

  @action
  loadNext() {
    if (this.canLoadMore){
      this.loadPics()
    }
  }

}
