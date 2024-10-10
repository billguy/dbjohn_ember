import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class PicsIndexController extends Controller {

  @service store;
  @service inViewport;
  @service session

  queryParams = ['tags', 'lat', 'lng'];

  @tracked pics = [];
  @tracked tagList = [];
  @tracked isLoaded = false;

  @tracked canLoadMore = true;
  @tracked currentPic = false;
  @tracked page = 0;

  @reads('picsTask.isRunning') isLoading;

  get params() {
    return {
      tags: this.tags,
      lat: this.lat,
      lng: this.lng,
      page: this.page,
      per_page: 9,
    };
  }

  @(task(function* (params) {
    const records = yield this.store.query('pic', params);
    this.isLoaded = true
    this.pics.pushObjects(records.toArray());
    this.tagList = records.get('meta.tag_list')
    const totalPages = records.get('meta.total_pages');
    if (this.page == totalPages) this.canLoadMore = false
  }).restartable()) picsTask;

  @action tagSelected(tag) {
    this.tags = tag.name
    this.reloadPics();
  }

  @action clearTags() {
    this.tags = null
    this.reloadPics();
  }

  reloadPics() {
    this.page = 0
    this.canLoadMore = true
    this.pics.clear();
    this.isLoaded = false
    this.currentPic = false
    this.loadPics();
  }

  loadPics() {
    this.incrementProperty('page');
    const task = this.picsTask;
    const params = this.params;
    task.perform(params);
  }

  didInsertElement() {
    set(this, 'viewportSpy', true);
  }

  @action setupInViewport() {
    const loader = document.getElementById('load-next');
    const viewportTolerance = { bottom: 200 };
    const { onEnter } = this.inViewport.watchElement(loader, {
      viewportTolerance,
    });
    onEnter(this.didEnterViewport.bind(this));
  }

  didEnterViewport() {
    if (this.canLoadMore) {
      this.loadPics();
    }
  }

  willDestroy() {
    const loader = this.elementId;
    this.inViewport.stopWatching(loader);
    super.willDestroy(...arguments);
  }
}
