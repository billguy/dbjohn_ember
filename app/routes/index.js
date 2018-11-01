import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  model(){
    return RSVP.hash({
      pic: this.store.query('pic', { per_page: 1 }).then((pic) => {
        return pic.get('firstObject')
      }),
      blogs: this.store.query('blog-post', { per_page: 2})
    });
  }
});
