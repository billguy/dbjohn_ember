import Component from '@ember/component';
import jQuery from 'jquery';
import { computed } from '@ember/object';

export default Component.extend({
  _fancyBoxInstance: undefined,
  images: undefined,

  initFancyBox(){
    let gallery = jQuery(".fancybox").fancybox({
      caption : function() {
        return jQuery(this).closest('figure').find('figcaption').html();
      }
    })
    this.set('_fancyBoxInstance', gallery)
  },

  destroyFancyBox(){
    jQuery.fancybox.destroy();
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

  didLoadMore: computed('images.length', function(){
    return this.reinit()
  })
});
