import FroalaEditorComponent from 'ember-froala-editor/components/froala-editor';
import config from '../config/environment';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default FroalaEditorComponent.extend({
  session: inject('session'),

  currentImageId: null,
  options: computed('currentImageId', function(){
    return {
      heightMin: 200,
      imageManagerLoadURL: config.host + '/assets',
      imageManagerDeleteURL: config.host + `/assets/${this.get('currentImageId')}`,
      imageManagerDeleteMethod: 'DELETE',
      imageUploadURL: config.host + '/assets',
      imageUploadParam: 'asset[attachment]',
      requestHeaders: {
        Authorization: `Bearer ${this.get('session.data.authenticated.access')}`
      }
    }
  }),

  // No idea how to alter imageManagerDeleteURL before delete
  'on-imageManager-beforeDeleteImage': function(editor, $img){
      let id = $img.data('id')
      this.set('currentImageId', id)
      editor.send('method', 'reinit') // Have to delete twice
      return true;
  },

});
