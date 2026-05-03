import pageTitle from 'ember-page-title/helpers/page-title';
import BsForm from 'ember-bootstrap/components/bs-form';
import GRecaptchaV2 from 'dbjohn-ember/components/g-recaptcha-v2';

<template>
  {{pageTitle "Contact me"}}

  <h1>Contact</h1>

  <BsForm @model={{@model}} @onSubmit={{@controller.submit}} as |form|>
    <form.element @label="Your name" @controlType="text" @property="name" />
    <form.element @label="Your email" @controlType="text" @property="email" />
    <form.element @label="Message" @controlType="textarea" @property="message" />
    <GRecaptchaV2 @verified={{@controller.setRecaptchaResponse}} />
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
