import pageTitle from 'ember-page-title/helpers/page-title';
import { LinkTo } from '@ember/routing';
import formatDate from 'dbjohn-ember/helpers/format-date';
import htmlContent from 'dbjohn-ember/helpers/html-content';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import PageNumbers from 'dbjohn-ember/components/page-numbers';

<template>
  {{pageTitle "Blogs"}}

  {{#if @controller.session.isAuthenticated}}
    <div class="float-right h1">
      <LinkTo @route="blog-posts.new">
        <div class="btn-primary btn-sm">+ New Post</div>
      </LinkTo>
    </div>
  {{/if}}

  <h1 class="h4">
    <a class="link" {{on "click" @controller.clearTags}}>
      <span>Blog posts</span>
    </a>
  </h1>

  {{#if @model.meta.tag_list}}
    <ul class="list-inline list-unstyled tags">
      {{#each @model.meta.tag_list as |tag|}}
        <li>
          <a class="link" {{on "click" (fn @controller.tagSelected tag)}}>
            {{tag.name}}
            <span>{{tag.taggings_count}}</span>
          </a>
        </li>
      {{/each}}
    </ul>
  {{/if}}

  <div class="clearfix"></div>

  <div id="posts" class="row">
    {{#each @model as |post|}}
      <div class="col-sm-6 blog">
        <h4>
          <LinkTo @route="blog-posts.show" @model={{post}}>{{post.title}}</LinkTo>
        </h4>
        <div class="text-muted small">
          {{formatDate post.createdAt}}
          <span>&nbsp;•&nbsp;</span>
        </div>
        <p>{{htmlContent post.content}}</p>
      </div>
    {{/each}}
  </div>

  <div class="float-left">
    <PageNumbers @controller={{@controller}} />
  </div>

  <div class="clearfix"></div>
</template>
