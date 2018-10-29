import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  redirects: {
    'blogs.index': 'blog-posts',
    'blogs.show': 'blog-posts.show'
  }
});

Router.map(function() {
  this.route('login');
  this.route('contact');
  this.route('about');

  this.route('blog-posts', function() {
    this.route('show', { path: '/:id' } );
    this.route('edit', { path: '/:id/edit' } );
    this.route('new');
  });
  this.route('pics', function() {
    this.route('show', { path: '/:id' } );
  });
  //Legacy route
  this.route('blogs', function() {
    this.route('show', { path: '/:id' } )
  });
});

export default Router;
