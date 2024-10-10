import Model, { attr } from '@ember-data/model';
// import { validator, buildValidations } from 'ember-cp-validations';

// const Validations = buildValidations({
//   name: [validator('presence', true), validator('ds-error')],
//   email: [validator('presence', true), validator('ds-error')],
//   message: [validator('presence', true), validator('ds-error')],
// });

export default class ContactModel extends Model {

// export default class ContactModel extends Model.extend(Validations) {
  @attr('string') name;
  @attr('string') email;
  @attr('string') message;
  @attr('string') response;
}
