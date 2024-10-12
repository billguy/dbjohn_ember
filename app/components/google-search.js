import Component from '@ember/component';
import config from '../config/environment';
import { tracked } from '@glimmer/tracking';

export default class GoogleSearch extends Component {
  @tracked loaded = false;

  get searchText() {
    if (this.args && this.args.q) return `Searching "${this.args}"`;
    else return 'Enter search term';
  }

  get gcse() {
    var cx = config.google_search_key;
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://www.google.com/cse/cse.js?cx=' + cx;
    return gcse;
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    let gcse = this.gcse;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
    this.loaded = true;
  }
}
