import { LinkTo } from '@ember/routing';
import PicCaption from 'dbjohn-ember/components/pic-caption';
import fromNow from 'dbjohn-ember/helpers/from-now';
import htmlContent from 'dbjohn-ember/helpers/html-content';

<template>
  <h1 class="d-none">David B. John</h1>

  {{#if @controller.isLoaded}}
    <div id="latest">
      <figure class="cap-bot">
        {{#each @controller.pics as |pic|}}
          <LinkTo @route="pics.show" @model={{pic}}>
            <img class="img-fluid" src={{pic.src}} />
            <figcaption>
              <PicCaption @pic={{pic}} />
            </figcaption>
          </LinkTo>
        {{/each}}
      </figure>
    </div>

    <div class="clearfix"></div>

    <br />
    <br />

    <div class="row marketing blogs">
      {{#each @controller.blogs as |blog|}}
        <div class="col-sm-12 col-md-6 blog">
          <h4>
            <LinkTo @route="blog-posts.show" @model={{blog}}>{{blog.title}}</LinkTo>
          </h4>
          <div class="text-muted small">
            {{fromNow blog.createdAt}}
          </div>
          {{htmlContent blog.content}}
        </div>
      {{/each}}
    </div>
  {{else}}
    <div id="latest">
      <div class="ph-item">
        <figure class="cap-bot ph-picture"></figure>
      </div>
    </div>

    <hr />
    <div class="row">
      <div class="col-sm-12 col-md-6 blog ph-item">
        <div class="ph-picture"></div>
      </div>
      <div class="col-sm-12 col-md-6 blog ph-item">
        <div class="ph-picture"></div>
      </div>
    </div>
  {{/if}}
</template>
