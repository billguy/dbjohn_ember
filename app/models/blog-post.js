import DS from 'ember-data';
import Post from './post';
import config from '../config/environment';
import { computed } from '@ember/object';

export default Post.extend({
  blog: DS.attr('boolean', { defaultValue: true }),
  discusIdentifier: computed('permalink', function(){
    return `${config.siteURL}/blog-posts/${this.get('permalink')}`
  })
});
