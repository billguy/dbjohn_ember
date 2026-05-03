import pageTitle from 'ember-page-title/helpers/page-title';
import { LinkTo } from '@ember/routing';
import BsModal from 'ember-bootstrap/components/bs-modal';
import { didInsert } from '@ember/render-modifiers';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

<template>
  {{pageTitle "Pics"}}

  {{#if @controller.session.isAuthenticated}}
    <div class="float-right h1">
      <LinkTo @route="pics.new">
        <div class="btn-primary btn-sm">+ New Pic</div>
      </LinkTo>
    </div>
  {{/if}}

  <h1 class="h4">
    <a class="link" {{on "click" @controller.clearTags}}>
      <span>Pics</span>
    </a>
  </h1>

  <div class="clearfix"></div>

  {{#unless @controller.isLoaded}}
    <div class="ph-item">
      <div class="ph-picture"></div>
    </div>

    <div class="ph-item">
      <div class="ph-col-4"><div class="ph-picture"></div></div>
      <div class="ph-col-4"><div class="ph-picture"></div></div>
      <div class="ph-col-4"><div class="ph-picture"></div></div>
    </div>

    <div class="ph-item">
      <div class="ph-col-4"><div class="ph-picture"></div></div>
      <div class="ph-col-4"><div class="ph-picture"></div></div>
      <div class="ph-col-4"><div class="ph-picture"></div></div>
    </div>

    <div class="ph-item">
      <div class="ph-col-4"><div class="ph-picture"></div></div>
      <div class="ph-col-4"><div class="ph-picture"></div></div>
      <div class="ph-col-4"><div class="ph-picture"></div></div>
    </div>
  {{else}}
    <ul class="list-inline list-unstyled tags">
      {{#each @controller.tagList as |tag|}}
        <li>
          <a class="link" {{on "click" (fn @controller.tagSelected tag)}}>
            {{tag.name}}
            <span>{{tag.taggings_count}}</span>
          </a>
        </li>
      {{/each}}
    </ul>

    <div id="pics" class="d-flex flex-wrap">
      {{#each @controller.pics as |pic|}}
        <figure>
          <img class="thumb" src={{pic.msrc}} alt={{pic.title}} {{on "click" (fn @controller.setCurrentPic pic)}} />
          <figcaption>
            <LinkTo @route="pics.show" @model={{pic}}>{{pic.title}}</LinkTo>
            <p>{{pic.caption}}</p>
          </figcaption>
        </figure>
      {{/each}}
    </div>

    <div id="load-next" {{didInsert @controller.setupInViewport}}></div>
  {{/unless}}

  <BsModal @open={{@controller.currentPic}} @size="lg" @onHidden={{fn @controller.setCurrentPic false}} as |modal|>
    <modal.header>
      <h4 class="modal-title">
        <LinkTo @route="pics.show" @model={{@controller.currentPic}}>
          {{@controller.currentPic.title}}
        </LinkTo>
      </h4>
    </modal.header>
    <modal.body>
      <div class="d-flex justify-content-center">
        <LinkTo @route="pics.show" @model={{@controller.currentPic}}>
          <img src={{@controller.currentPic.src}} alt={{@controller.currentPic.title}} />
        </LinkTo>
      </div>
    </modal.body>
  </BsModal>
</template>
