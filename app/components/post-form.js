import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { action } from '@ember/object';

export default class PostFormComponent extends Component {
  @inject flashMessages;
  @inject router;

  @action submit(model) {
    return model
      .save()
      .then(() => {
        this.router.transitionTo('blog-posts.show', model.id);
      })
      .catch((reason) => {
        if (reason.json) this.flashMessages.danger(reason.json.error);
      });
  }
  @action addTag(newTag) {
    return this.args.model.tagList.addObject(newTag);
  }
  @action removeTagAtIndex(index) {
    return this.args.model.tagList.removeAt(index);
  }
}
