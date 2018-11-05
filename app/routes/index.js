import Route from '@ember/routing/route';
import { task } from 'ember-concurrency';

export default Route.extend({

  model(){
    return {
      pic: this.get('picTask').perform(),
      blogs: this.get('blogsTask').perform(),
    }
  },

  picTask: task(function *(){
    let pic = yield this.get('store').query('pic', { per_page: 1 }).then((pics) => {
      return pics.get('firstObject')
    })
    return pic;
  }),

  blogsTask: task(function *(){
    let blogs = yield this.get('store').query('blog-post', { per_page: 2 })
    return blogs;
  })
});
