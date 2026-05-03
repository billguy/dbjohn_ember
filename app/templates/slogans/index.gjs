import pageTitle from 'ember-page-title/helpers/page-title';
import { LinkTo } from '@ember/routing';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

<template>
  {{pageTitle "Slogans"}}

  <div class="float-right h1">
    <LinkTo @route="slogans.new">
      <div class="btn-primary btn-sm">+ New Slogan</div>
    </LinkTo>
  </div>

  <div class="float-left">
    <h1>Slogans</h1>
  </div>

  <div class="clearfix"></div>

  <div id="slogans" class="container">
    {{#each @model as |slogan|}}
      <div class="row">
        <div class="col-xs-12">
          {{slogan.title}}
          <LinkTo @route="slogans.edit" @model={{slogan}}>
            <span>edit</span>
          </LinkTo>
          <a class="link" {{on "click" (fn @controller.destroySlogan slogan)}}>
            <span>delete</span>
          </a>
        </div>
      </div>
    {{/each}}
  </div>
</template>
