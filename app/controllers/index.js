import Controller from '@ember/controller';
import { reads } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Controller.extend({

  pic: reads('model.pic.value'),
  blogs: reads('model.blogs.value'),

  isLoaded: computed('pic', 'blogs', function(){
    let pic = this.get('pic')
    let blogs = this.get('blogs')
    return pic && blogs
  })

});
