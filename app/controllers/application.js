import { action } from '@ember/object';
import { inject } from '@ember/service';
import Controller from '@ember/controller';
import { later } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {

  @inject session;
  @inject currentUser;
  @inject flashMessages;

  queryParams = ['q'];
  @tracked q = null;

  @tracked isSearching = false;
  @tracked slogans = []

  get searchBoxClasses(){
    return this.isSearching ? "searchBox showSearchBox" : "searchBox hideSearchBox"
  }

  @action didInsert() {
    this.isSearching = this.q != null ? true : false
    return later(this, function () {
      this.slogans = this.model
    }, 5000)
  }

  @action doSearch(){
    if(event.key === 'Enter') {
      this.q = event.target.value
      const element = window.google.search.cse.element.getElement('results');
      element.prefillQuery(this.q);
      element.execute(this.q);
    }
  }

  @action
  searchClicked() {
    if (this.isSearching){
      this.isSearching = false
      this.set('q', null)
    } else {
      this.isSearching = true
    }
  }

  @action
  invalidateSession() {
    this.session.invalidate();
  }
}
