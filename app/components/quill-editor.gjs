import Component from '@glimmer/component';
import { action } from '@ember/object';
import Quill from 'quill';
import { didInsert } from '@ember/render-modifiers';

export default class QuillEditorComponent extends Component {
  @action
  setupEditor(element) {
    const quill = new Quill(element, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          ['clean'],
        ],
      },
    });

    const content = this.args.content?.toString();
    if (content) {
      quill.clipboard.dangerouslyPasteHTML(content);
    }

    quill.on('text-change', () => {
      this.args.update?.(quill.root.innerHTML);
    });
  }

  <template>
    <div {{didInsert this.setupEditor}}></div>
  </template>
}
