import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';

export default Component.extend(InViewportMixin, {

  init() {
    this._super(...arguments);
    this.set('viewportSpy', true)
  },

  didEnterViewport() {
    this.loadNextAction()
  },

});
