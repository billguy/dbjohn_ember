import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ["q"],
  isSearching: false,
  actions: {
    searchClicked(){
      this.toggleProperty('isSearching')
    }
  }
});
