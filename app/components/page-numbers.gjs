import { action } from '@ember/object';
import { reads } from '@ember/object/computed';
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

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
  incrementPage(event, v) {
    event.preventDefault();
    const newVal = v < 0 ? this.page - 1 : this.page + 1;
    this.controller.set('page', newVal);
  }

  @action
  pageClicked(event, page) {
    event.preventDefault();
    this.controller.set('page', page);
  }

  <template>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        {{#if this.canStepBackward}}
          <li class="arrow prev enabled-arrow page-item">
            <a class="page-link" href="#" {{on "click" (fn this.incrementPage -1)}}>&laquo;</a>
          </li>
        {{else}}
          <li class="arrow prev disabled page-item">
            <a class="page-link" href="#" {{on "click" (fn this.incrementPage -1)}}>&laquo;</a>
          </li>
        {{/if}}

        {{#each this.pageItems as |item|}}
          {{#if item.dots}}
            <li class="dots disabled page-item">
              <span>...</span>
            </li>
          {{/if}}
          {{#if item.current}}
            <li class="active page-number page-item">
              <a class="page-link">{{item.page}}</a>
            </li>
          {{else}}
            <li class="page-number page-item">
              <a class="page-link" href="#" {{on "click" (fn this.pageClicked item.page)}}>{{item.page}}</a>
            </li>
          {{/if}}
        {{/each}}

        {{#if this.canStepForward}}
          <li class="arrow next enabled-arrow page-item">
            <a class="page-link" href="#" {{on "click" (fn this.incrementPage 1)}}>&raquo;</a>
          </li>
        {{else}}
          <li class="arrow next disabled page-item">
            <a class="page-link" href="#" {{on "click" (fn this.incrementPage 1)}}>&raquo;</a>
          </li>
        {{/if}}
      </ul>
    </nav>
  </template>
}
