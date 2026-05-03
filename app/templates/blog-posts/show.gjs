import pageTitle from 'ember-page-title/helpers/page-title';
import { LinkTo } from '@ember/routing';
import formatDate from 'dbjohn-ember/helpers/format-date';
import htmlContent from 'dbjohn-ember/helpers/html-content';
import BsModalSimple from 'ember-bootstrap/components/bs-modal-simple';
import { on } from '@ember/modifier';
import { fn, hash } from '@ember/helper';

<template>
  {{pageTitle @model.title}}

  <div class="float-left">
    <h1>{{@model.title}}</h1>
    <small class="text-muted">
      {{formatDate @model.createdAt}}
    </small>
  </div>

  {{#if @controller.session.isAuthenticated}}
    <BsModalSimple
      @title="Please confirm"
      @renderInPlace={{true}}
      @closeTitle="Cancel"
      @submitTitle="Confirm"
      @open={{@controller.shouldDelete}}
      @onSubmit={{fn @controller.deletePost @model}}
      @onHide={{fn @controller.setShouldDelete false}}
    >
      <p>You're about to delete '{{@model.title}}'. Are you sure?</p>
    </BsModalSimple>

    <div class="float-right">
      <LinkTo @route="blog-posts.edit" @model={{@model}}>edit</LinkTo>
      <span>&nbsp;|&nbsp;</span>
      <span class="text-danger" style="cursor: pointer" {{on "click" (fn @controller.setShouldDelete true)}}>delete</span>
    </div>
  {{/if}}

  <div class="clearfix"></div>

  <ul class="list-inline list-unstyled tags">
    {{#each @model.tags as |tag|}}
      <li>
        <LinkTo @route="blog-posts" @query={{hash tags=tag.name}}>
          {{tag.name}}
          <span>{{tag.taggings_count}}</span>
        </LinkTo>
      </li>
    {{/each}}
  </ul>

  <div class="blog-post">
    {{htmlContent @model.content}}
  </div>
</template>
