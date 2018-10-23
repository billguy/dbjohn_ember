import EmberObject from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  email: [ validator('presence', true) ],
  password: [ validator('presence', true) ],
});

export default EmberObject.extend(Validations, {
  email: null,
  password: null
});
