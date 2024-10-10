import { action } from '@ember/object';
import { reads } from '@ember/object/computed';
import Component from '@glimmer/component';

export default class PageNumbers extends Component {
  @reads('args.controller.model.meta.total_pages') totalPages;
  @reads('args.controller') controller;
  @reads('args.controller.page') page;

  get canStepBackward() {
    return this.page > 1;
  }

  get canStepForward() {
    return this.page < this.totalPages;
  }

  @action
  incrementPage(v) {
    const newVal = v < 0 ? this.page - 1 : this.page + 1;
    this.controller.set('page', newVal);
  }
}
