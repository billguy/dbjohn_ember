import Model, { attr } from '@ember-data/model';
// import { validator, buildValidations } from 'ember-cp-validations';

// const Validations = buildValidations({
//   title: [
//     validator('presence', true),
//     validator('ds-error')
//   ]
// });
export default class SloganModel extends Model {
  // export default class SloganModel extends Model.extend(Validations) {
  @attr('string') title;
  @attr('date') createdAt;
  @attr('date') updatedAt;
}
