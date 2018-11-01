import Component from '@ember/component';

export default Component.extend({
  actions: {
    submit(model) {
      this.submitAction(model)
    },
    addTag(newTag) {
      this.get('model.tagList').addObject(newTag);
    },
    addTags(newTags) {
      this.get('model.tagList').addObject(newTags);
    },
    replaceTagAtIndex(tag, index) {
      this.get('model.tagList').replace(index, 1, [tag]);
    },
    replaceTagWithTagsAtIndex(tags, index) {
      this.get('model.tagList').replace(index, 1, tags);
    },
    removeTagAtIndex(index) {
      this.get('model.tagList').removeAt(index);
    }
  }
});
