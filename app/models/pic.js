import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: [
    validator('presence', true),
    validator('ds-error')
  ]
});

export default DS.Model.extend(Validations, {
  published: DS.attr('boolean', { defaultValue: false }),
  title: DS.attr('string'),
  permalink: DS.attr('string'),
  caption: DS.attr('string'),
  tags: DS.attr(), // To the server
  tagList: DS.attr(),  //From the server
  location: DS.attr('string'),
  lat: DS.attr('number'),
  lng: DS.attr('number'),
  photo: DS.attr('string'),
  src: DS.attr('string'),
  msrc: DS.attr('string'),
  w: DS.attr('number'),
  h: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
