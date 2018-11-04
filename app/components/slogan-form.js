import Component from '@ember/component';

export default Component.extend({

  actions: {
    submit(model) {
      this.submitAction(model)
    }
  }
});
