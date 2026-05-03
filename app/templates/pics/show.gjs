import pageTitle from 'ember-page-title/helpers/page-title';
import { LinkTo } from '@ember/routing';
import GoogleMap from 'dbjohn-ember/components/google-map';
import PicCaption from 'dbjohn-ember/components/pic-caption';
import BsModalSimple from 'ember-bootstrap/components/bs-modal-simple';
import { didInsert } from '@ember/render-modifiers';
import { on } from '@ember/modifier';
import { fn, hash } from '@ember/helper';

<template>
  {{pageTitle @model.title}}

  <div class="d-flex justify-content-between pic-header" {{didInsert @controller.didInsert}}>
    <LinkTo @route="pics.show" @model={{@model.prevPermalink}}>
      <img src={{@model.prevThumbUrl}} alt={{@model.prevPermalink}} height="100" width="100" />
    </LinkTo>

    <div class="d-none d-sm-block">
      {{#if @model.hasCoords}}
        <GoogleMap @lat={{@model.lat}} @lng={{@model.lng}} @zoom={{10}} @onMarkerClick={{fn @controller.markerClicked @model}} />
      {{else}}
        <div class="h4 hidden-xs text-muted text-center content map">Map Unavailable</div>
      {{/if}}
    </div>

    <LinkTo @route="pics.show" @model={{@model.nextPermalink}}>
      <img src={{@model.nextThumbUrl}} alt={{@model.nextPermalink}} height="100" width="100" />
    </LinkTo>
  </div>

  <figure id="subject" class="cap-bot">
    <a href={{@model.src}}>
      <img class="img-fluid" src={{@model.src}} alt={{@model.title}} />
      <figcaption>
        <PicCaption @pic={{@model}} />
      </figcaption>
    </a>
  </figure>

  <div class="float-left">
    <h1>{{@model.title}}</h1>
    <ul class="list-inline list-unstyled tags">
      {{#each @model.tags as |tag|}}
        <li>
          <LinkTo @route="pics" @query={{hash tags=tag.name}}>
            {{tag.name}}
            <span>{{tag.taggings_count}}</span>
          </LinkTo>
        </li>
      {{/each}}
    </ul>
  </div>

  <div class="float-right">
    {{#if @controller.session.isAuthenticated}}
      <BsModalSimple
        @title="Please confirm"
        @renderInPlace={{true}}
        @closeTitle="Cancel"
        @submitTitle="Confirm"
        @open={{@controller.shouldDelete}}
        @onSubmit={{fn @controller.deletePic @model}}
        @onHide={{fn @controller.setShouldDelete false}}
      >
        <p>You're about to delete '{{@model.title}}'. Are you sure?</p>
      </BsModalSimple>

      <div class="float-right">
        <LinkTo @route="pics.edit" @model={{@model}}>edit</LinkTo>
        <span>&nbsp;|&nbsp;</span>
        <span class="text-danger" style="cursor: pointer" {{on "click" (fn @controller.setShouldDelete true)}}>delete</span>
      </div>
    {{/if}}
  </div>

  <div class="clearfix"></div>

  <p>{{@model.caption}}</p>

  <br />
</template>
