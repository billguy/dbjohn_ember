import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    submit(model){
      console.log(model)
      model.save().then(()=>{
        this.transitionToRoute('blog-posts.show', model.id)
      }).catch((reason) => {
        if (reason.json)
          this.flashMessages.danger(reason.json.error)
      });
    }
  }
});
