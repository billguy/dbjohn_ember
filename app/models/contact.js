import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: [
    validator('presence', true),
    validator('ds-error')
  ],
  email: [
    validator('presence', true),
    validator('ds-error')
  ],
  message: [
    validator('presence', true),
    validator('ds-error')
  ]
});

export default DS.Model.extend(Validations, {
  name: DS.attr('string'),
  email: DS.attr('string'),
  message: DS.attr('string'),
  response: DS.attr()
});
