import Component from '@ember/component';
import config from '../config/environment';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({

  activeStorage: inject(),
  flashMessages: inject(),
  router: inject(),
  uploadProgress: 0,
  uploadProgressPercent: computed('uploadProgress', function(){
    let progress = this.uploadProgress
    if (progress > 0)
      return `Progress ${progress} %`
    else
      return ''
  }),

  actions: {
    submit(model) {
      return model.save().then(()=>{
        this.router.transitionTo('pics.show', model.id)
      }).catch((reason) => {
        if (reason.json)
          this.flashMessages.danger(reason.json.error)
      });
    },
    uploadPic(event) {
      const files = event.target.files
      let pic = this.get('model')
      if (files) {
        const directUploadURL = config.host + '/rails/active_storage/direct_uploads'
        let activeStorage = this.activeStorage
        for (var i = 0; i < files.length; i++) {
          activeStorage.upload(files.item(i), directUploadURL, {
            onProgress: (progress) => {
              this.set('uploadProgress', progress)
            }
          }).then( (blob) => {
            pic.set('photo', blob.signedId)
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
