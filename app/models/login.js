import EmberObject from '@ember/object';
// import { validator, buildValidations } from 'ember-cp-validations';
import { tracked } from '@glimmer/tracking';

// const Validations = buildValidations({
//   email: [ validator('presence', true) ],
//   password: [ validator('presence', true) ],
// });

export default class Login extends EmberObject {
  // export default class Login extends EmberObject.extend(Validations) {

  @tracked email;
  @tracked password;
}
