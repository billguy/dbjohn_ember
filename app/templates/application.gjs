import pageTitle from 'ember-page-title/helpers/page-title';
import { LinkTo } from '@ember/routing';
import FlashMessage from 'ember-cli-flash/components/flash-message';
import BsNav from 'ember-bootstrap/components/bs-nav';
import GoogleSearch from 'dbjohn-ember/components/google-search';
import { didInsert } from '@ember/render-modifiers';
import { on } from '@ember/modifier';

<template>
  {{pageTitle "David B. John"}}

  <main class="container" role="main">
    {{#each @controller.flashMessages.queue as |flash|}}
      <div class="alert-fixed">
        <FlashMessage @flash={{flash}} />
      </div>
    {{/each}}

    <div class="header">
      <div id="slogan" class="float-left" {{didInsert @controller.didInsert}}>
        <LinkTo @route="index">
          {{#if @controller.slogans.length}}
            {{#each @controller.slogans as |slogan|}}
              <span id="sloganTitle" class="fade-in-text">{{slogan.title}}</span>
            {{/each}}
          {{else}}
            <span id="sloganTitle" class="fade-in-text">David B. John</span>
          {{/if}}
        </LinkTo>
      </div>

      <div class="float-right">
        <BsNav @type="pills" as |nav|>
          {{#unless @controller.isSearching}}
            <nav.item>
              <nav.linkTo @route="pics"><span>Pics</span></nav.linkTo>
            </nav.item>
            <nav.item>
              <nav.linkTo @route="blog-posts"><span>Blog</span></nav.linkTo>
            </nav.item>
            <nav.item>
              <nav.linkTo @route="about"><span>About</span></nav.linkTo>
            </nav.item>
          {{/unless}}

          <nav.item>
            <input type="text" class={{@controller.searchBoxClasses}} placeholder="search" value={{@controller.q}} {{on "keydown" @controller.doSearch}} />
            <button class="btn btn-link" type="button" {{on "click" @controller.searchClicked}}>
              {{#if @controller.isSearching}}
                <img src="/assets/images/cancel.png" />
              {{else}}
                <img src="/assets/images/search.png" />
              {{/if}}
            </button>
          </nav.item>
        </BsNav>
      </div>

      <div class="clearfix"></div>
    </div>

    <div id="content">
      {{#if @controller.isSearching}}
        <GoogleSearch @q={{@controller.q}} />
      {{else}}
        {{outlet}}
      {{/if}}
    </div>

    <div class="footer">
      <div class="float-right">
        <a href="https://rubyonrails.org/">
          <img class="inline" src="/assets/images/rails.jpg" alt="Ruby on Rails Logo" />
        </a>
        <a href="https://emberjs.com/">
          <img class="inline" src="/assets/images/ember.jpg" alt="Ember JS Logo" />
        </a>
      </div>
      <div class="float-left">
        {{#if @controller.session.isAuthenticated}}
          <a class="link" {{on "click" @controller.invalidateSession}}>
            <div class="text-muted">Logout {{@controller.currentUser.user.name}}</div>
          </a>
        {{else}}
          <LinkTo @route="login">
            <div class="text-muted">&nbsp;&copy;&nbsp;DBJohn, LLC</div>
          </LinkTo>
        {{/if}}
      </div>
    </div>
    <div class="clearfix"></div>
  </main>
</template>
