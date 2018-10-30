import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

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
  tags: DS.attr(), // To the server
  tagList: DS.attr(),  //From the server
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
