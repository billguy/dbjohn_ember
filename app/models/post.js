import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  title: [
    validator('presence', true),
    validator('ds-error')
  ],
  content: [
    validator('presence', true),
    validator('ds-error')
  ]
});

export default DS.Model.extend(Validations, {
  published: DS.attr('boolean', { defaultValue: false }),
  blog: DS.attr('boolean', { defaultValue: false }),
  title: DS.attr('string'),
  permalink: DS.attr('string'),
  content: DS.attr('string'),
  tagList: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
