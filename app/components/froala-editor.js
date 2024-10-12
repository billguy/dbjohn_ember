import FroalaEditorComponent from 'ember-froala-editor/components/froala-editor';
import config from '../config/environment';
import { inject } from '@ember/service';

export default class FroalaEditor extends FroalaEditorComponent {
  @inject session;
  @inject ajax;
  @inject pageFlash;

  constructor() {
    super(...arguments);
    const { access } = this.session.data.authenticated;
    const options = {
      heightMin: 200,
      imageManagerLoadURL: config.host + '/assets',
      imageManagerDeleteURL: config.host + `/zassets`,
      imageManagerDeleteMethod: 'DELETE',
      imageUploadURL: config.host + '/assets',
      imageUploadParam: 'asset[attachment]',
      htmlRemoveTags: [],
      requestHeaders: {
        Authorization: `Bearer ${access}`,
      },
    };
    this.options = options;
  }

  //  *** TODO: Fix cannot access this ***
  'on-imageManager-beforeDeleteImage'(editor, img) {
    const id = img.data('id');
    const url = `${config.host}/assets/${id}`;

    this.ajax
      .del(url)
      .then(() => {
        img.remove();
      })
      .catch((error) => {
        this.pageFlash.danger(error);
      });
    return false;
  }
}
