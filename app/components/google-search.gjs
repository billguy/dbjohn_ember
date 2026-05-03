import Component from '@glimmer/component';
import { action } from '@ember/object';
import config from 'dbjohn-ember/config/environment';
import { didInsert } from '@ember/render-modifiers';

export default class GoogleSearch extends Component {
  get searchText() {
    if (this.args.q) return `Searching "${this.args.q}"`;
    else return 'Enter search term';
  }

  @action
  setup() {
    const cx = config.google_search_key;
    const gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://www.google.com/cse/cse.js?cx=' + cx;
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  }

  <template>
    <div class="text-muted h3">
      {{this.searchText}}
    </div>

    <div id="results" {{didInsert this.setup}}>
      <gcse:searchresults-only gname="results"></gcse:searchresults-only>
    </div>
  </template>
}
