import pageTitle from 'ember-page-title/helpers/page-title';
import { LinkTo } from '@ember/routing';
import formatDate from 'dbjohn-ember/helpers/format-date';
import htmlContent from 'dbjohn-ember/helpers/html-content';

<template>
  {{pageTitle "About"}}

  <div class="float-left">
    <h1>{{@model.title}}</h1>
    <small class="text-muted">
      <span>Last updated:&nbsp;</span>
      {{formatDate @model.updatedAt}}
    </small>
  </div>

  {{#if @controller.session.isAuthenticated}}
    <div class="float-right">
      <LinkTo @route="blog-posts.edit" @model={{@model}}>edit</LinkTo>
    </div>
  {{/if}}

  <div class="clearfix"></div>

  <div class="blog-post">
    {{htmlContent @model.content}}
  </div>
</template>
