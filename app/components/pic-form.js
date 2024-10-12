import Component from '@glimmer/component';
import config from '../config/environment';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class PicFormComponent extends Component {
  @service activeStorage;
  @service flashMessages;
  @service router;

  @tracked uploadProgress = 0;

  get uploadProgressPercent() {
    let progress = this.uploadProgress;
    if (progress > 0) return `Progress ${progress} %`;
    else return '';
  }

  @action submit(model) {
    return model
      .save()
      .then(() => {
        this.router.transitionTo('pics.show', model.id);
      })
      .catch((reason) => {
        if (reason.json) this.flashMessages.danger(reason.json.error);
      });
  }

  @action uploadPic(event) {
    const files = event.target.files;
    let pic = this.args.model;
    if (files) {
      const directUploadURL =
        config.host + '/rails/active_storage/direct_uploads';
      let activeStorage = this.activeStorage;
      for (var i = 0; i < files.length; i++) {
        activeStorage
          .upload(files.item(i), directUploadURL, {
            onProgress: (progress) => {
              this.uploadProgress = progress;
            },
          })
          .then((blob) => {
            pic.photo = blob.signedId;
          });
      }
    }
  }
  @action addTag(newTag) {
    this.args.model.tagList.addObject(newTag);
  }
  @action removeTagAtIndex(index) {
    this.args.model.tagList.removeAt(index);
  }
}
