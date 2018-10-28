import DS from 'ember-data';
import Post from './post';

export default Post.extend({
  blog: DS.attr('boolean', { defaultValue: true }),
});
