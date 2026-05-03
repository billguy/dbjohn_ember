import Component from '@glimmer/component';
import config from 'dbjohn-ember/config/environment';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import BsForm from 'ember-bootstrap/components/bs-form';
import TagInput from 'ember-tag-input/components/tag-input';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

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
      const directUploadURL = config.host + '/rails/active_storage/direct_uploads';
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

  <template>
    <BsForm @model={{@model}} @multipart={{true}} @onSubmit={{this.submit}} as |form|>
      <form.element @label="Active" @controlType="checkbox" @property="published" />
      <form.element @label="Title" @controlType="text" @property="title" />
      <TagInput
        @tags={{@model.tagList}}
        @addTag={{this.addTag}}
        @removeTagAtIndex={{this.removeTagAtIndex}}
        as |tagLabel|
      >
        {{tagLabel}}
      </TagInput>
      <br />
      <form.element @label="Caption" @controlType="textarea" @property="caption" />

      <form.element @label="Photo" @controlType="file" @property="photo" as |el|>
        <div class="input-group">
          <input class="form-control" accept="image/*" type="file" {{on "change" this.uploadPic}} id={{el.id}} style="display:inline-block;" />
          <span>{{this.uploadProgressPercent}}</span>
        </div>
      </form.element>

      {{#if @model.msrc}}
        <img class="thumbnail" src={{@model.msrc}} alt={{@model.title}} />
        <br />
      {{/if}}

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
