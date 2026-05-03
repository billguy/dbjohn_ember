import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import BsForm from 'ember-bootstrap/components/bs-form';
import TagInput from 'ember-tag-input/components/tag-input';
import QuillEditor from 'dbjohn-ember/components/quill-editor';

export default class PostFormComponent extends Component {
  @service flashMessages;
  @service router;

  get safeContent() {
    return htmlSafe(this.args.model.content);
  }

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

  @action updateContent(content) {
    this.args.model.content = content;
  }

  <template>
    <BsForm @model={{@model}} @onSubmit={{this.submit}} as |form|>
      <form.element @label="Published" @controlType="checkbox" @property="published" />
      <form.element @label="Title" @controlType="text" @property="title" />
      <form.element @label="Permalink" @controlType="text" @property="permalink" />

      <TagInput
        @tags={{@model.tagList}}
        @addTag={{this.addTag}}
        @removeTagAtIndex={{this.removeTagAtIndex}}
        as |tagLabel|
      >
        {{tagLabel}}
      </TagInput>
      <br />
      <div class="sr-only">
        <form.element @label="Content" @controlType="textarea" @property="content" />
      </div>

      <QuillEditor @content={{this.safeContent}} @update={{this.updateContent}} />

      <br />

      <form.submitButton>
        {{#if form.isSubmitting}}
          <span>Please wait...</span>
        {{else}}
          <span>Submit</span>
        {{/if}}
      </form.submitButton>
    </BsForm>
  </template>
}
