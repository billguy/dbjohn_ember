import Controller from '@ember/controller';

export default Controller.extend({
actions: {
  destroySlogan(slogan){
    slogan.destroyRecord().then(() => {
      this.transitionToRoute("slogans.index")
      this.flashMessages.success(`${slogan.title} deleted`)
    });
  }
}
});
