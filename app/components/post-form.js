import Component from '@ember/component';

export default Component.extend({
  actions: {
    submit(model) {
      this.submitAction(model)
    },
    addTag(newTag) {
      this.get('model.tagList').addObject(newTag);
    },
    removeTagAtIndex(index) {
      this.get('model.tagList').removeAt(index);
    }
  }
});
