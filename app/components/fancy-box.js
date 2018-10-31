import Component from '@ember/component';
import $ from 'jquery';
import { computed } from '@ember/object';

export default Component.extend({
  _fancyBoxInstance: undefined,
  images: undefined,

  initFancyBox(){
    let gallery = $(".fancybox").fancybox({
      caption : function() {
        return $(this).closest('figure').find('figcaption').html();
      }
    })
    this.set('_fancyBoxInstance', gallery)
  },

  destroyFancyBox(){
    $.fancybox.destroy();
  },

  didInsertElement() {
    this._super(...arguments);
    this.initFancyBox()
  },

  willDestroyElement(){
    this.destroyFancyBox()
  },

  reinit(){
    this.initFancyBox()
    this.destroyFancyBox()
  },

  didLoadMore: computed('loadedMore', function(){
    this.reinit()
  })
});
