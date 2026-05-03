import formatDate from 'dbjohn-ember/helpers/format-date';

<template>
  <ul class="list-unstyled">
    <li>{{formatDate @pic.picDate}}</li>
    {{#if @pic.camera}}
      <li>{{@pic.camera}}</li>
    {{/if}}
    {{#if @pic.fInfo}}
      <li>{{@pic.fInfo}}</li>
    {{/if}}
    {{#if @pic.location}}
      <li>{{@pic.location}}</li>
    {{/if}}
  </ul>
</template>
