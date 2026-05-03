import BsForm from 'ember-bootstrap/components/bs-form';

<template>
  <BsForm @model={{@controller.login}} @onSubmit={{@controller.authenticate}} as |form|>
    <form.element @label="User" @controlType="email" @property="email" />
    <form.element @label="Password" @controlType="password" @property="password" />
    <form.submitButton>Submit</form.submitButton>
  </BsForm>
</template>
