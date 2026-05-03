import SloganForm from 'dbjohn-ember/components/slogan-form';

<template>
  <h1>Editing '{{@model.title}}'</h1>
  <SloganForm @model={{@model}} @submitAction={{@controller.submit}} />
</template>
