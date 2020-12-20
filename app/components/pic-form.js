import Component from '@ember/component';
import config from '../config/environment';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({

  activeStorage: inject(),
  submitDisabled: false,
  uploadProgress: 0,
  uploadProgressPercent: computed('uploadProgress', function(){
    let progress = this.uploadProgress
    if (progress > 0)
      return `Progress ${progress} %`
    else
      return ''
  }),

  actions: {
    submit() {
      this.submitAction(this.model)
    },
    uploadPic(event) {
      const files = event.target.files
      let pic = this.get('model')
      if (files) {
        this.set('submitDisabled', true)
        const directUploadURL = config.host + '/rails/active_storage/direct_uploads'
        let activeStorage = this.activeStorage
        for (var i = 0; i < files.length; i++) {
          activeStorage.upload(files.item(i), directUploadURL, {
            onProgress: (progress) => {
              this.set('uploadProgress', progress)
            }
          }).then( (blob) => {
            const signedId = blob.get('signedId')
            pic.set('photo', signedId)
            this.set('submitDisabled', false)
          });
        }
      }
    },
    addTag(newTag) {
      this.get('model.tagList').addObject(newTag);
    },
    removeTagAtIndex(index) {
      this.get('model.tagList').removeAt(index);
    }
  }
});
