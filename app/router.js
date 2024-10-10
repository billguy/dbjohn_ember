import EmberRouter from '@ember/routing/router';
import config from 'dbjohn-ember/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('contact', function() {
    this.route('new');
  });
  this.route('about');

  this.route('blog-posts', function() {
    this.route('show', { path: '/:id' } );
    this.route('edit', { path: '/:id/edit' } );
    this.route('new');
  });
  this.route('pics', function() {
    this.route('show', { path: '/:id' } );
    this.route('edit', { path: '/:id/edit' } );
    this.route('new');
  });
  //Legacy route
  this.route('blogs', function() {
    this.route('show', { path: '/:id' } )
  });
  this.route('slogans', function() {
    this.route('new');
    this.route('edit', { path: '/:id/edit' } );
  });
});
