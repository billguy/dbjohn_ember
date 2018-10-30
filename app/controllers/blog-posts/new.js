import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    submit(){
      let blogPost = this.get('model')
      blogPost.save().then(()=>{
        this.transitionToRoute('blog-posts.show', blogPost)
      }).catch((reason) => {
        if (reason.json)
          this.flashMessages.danger(reason.json.error)
      });
    }
  }
});
