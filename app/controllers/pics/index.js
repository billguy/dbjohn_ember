import Controller from '@ember/controller';
import { service } from '@ember/service';
import { reads } from '@ember/object/computed';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class PicsIndexController extends Controller {
  @service store;
  @service session;

  _observer = null;

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

  picsTask = task({ restartable: true }, async (params) => {
    const records = await this.store.query('pic', params);
    this.isLoaded = true;
    this.pics = [...this.pics, ...records];
    this.tagList = records.meta.tag_list;
    const totalPages = records.meta.total_pages;
    if (this.page == totalPages) this.canLoadMore = false;
  });

  @action tagSelected(tag) {
    this.tags = tag.name;
    this.reloadPics();
  }

  @action clearTags() {
    this.tags = null;
    this.reloadPics();
  }

  @action setCurrentPic(pic) {
    this.currentPic = pic;
  }

  reloadPics() {
    this.page = 0;
    this.canLoadMore = true;
    this.pics = [];
    this.isLoaded = false;
    this.currentPic = false;
    this.loadPics();
  }

  loadPics() {
    this.incrementProperty('page');
    const task = this.picsTask;
    const params = this.params;
    task.perform(params);
  }

  @action setupInViewport(element) {
    this._observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && this.canLoadMore) {
          this.loadPics();
        }
      },
      { rootMargin: '0px 0px 200px 0px' },
    );
    this._observer.observe(element);
  }

  willDestroy() {
    this._observer?.disconnect();
    super.willDestroy(...arguments);
  }
}
