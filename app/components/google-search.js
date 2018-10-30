import Component from '@ember/component';
import config from '../config/environment';
import { computed } from '@ember/object';

export default Component.extend({
  loaded: false,
  searchText: computed('q', function(){
    let q = this.get('q')
    // let google = this.get('gcse')
    if (this.loaded){
      var element = google.search.cse.element.getElement("results");
      element.prefillQuery(q);
      element.execute(q);
    }
    if (q)
      return `Searching "${q}"`
    else
      return 'Enter search term'
  }),
  gcse: computed(function(){
    var cx = config.google_search_key;
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://www.google.com/cse/cse.js?cx=' + cx;
    return gcse
  }),
  didInsertElement() {
    this._super(...arguments);
    let gcse = this.get('gcse')
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
    this.set('loaded', true)
  }
});
