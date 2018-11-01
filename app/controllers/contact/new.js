import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    submit(contact){
      contact.save().then(()=>{
        this.transitionToRoute('/')
        this.flashMessages.success('Thanks for your message')
      }).catch((reason) => {
        if (reason.json)
          this.flashMessages.danger(reason.json.error)
      });
    }
  }
});
