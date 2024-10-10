import Model, { attr } from '@ember-data/model';
// import { validator, buildValidations } from 'ember-cp-validations';
import config from '../config/environment';

// const Validations = buildValidations({
//   title: [
//     validator('presence', true),
//     validator('ds-error')
//   ],
//   content: [
//     validator('presence', true),
//     validator('ds-error')
//   ]
// });
export default class PostModel extends Model {
  // export default class PostModel extends Model.extend(Validations) {
  @attr('boolean', { defaultValue: false }) published;
  @attr('boolean', { defaultValue: false }) blog;
  @attr('string') title;
  @attr('string') permalink;
  @attr('string') content;
  @attr() tags; // To the server
  @attr() tagList; //From the server
  @attr('date') createdAt;
  @attr('date') updatedAt;
  get discusIdentifier() {
    return `${config.siteURL}/posts/${this.permalink}`;
  }
}
