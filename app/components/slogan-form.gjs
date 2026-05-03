import Component from '@glimmer/component';
import { action } from '@ember/object';
import BsForm from 'ember-bootstrap/components/bs-form';

export default class SloganFormComponent extends Component {
  @action submit(model) {
    return this.args.submitAction(model);
  }

  <template>
    <BsForm @model={{@model}} @multipart={{true}} @onSubmit={{this.submit}} as |form|>
      <form.element @label="Title" @controlType="text" @property="title" />
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
