import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  title: [
    validator('presence', true),
    validator('ds-error')
  ],
  caption: [
    validator('presence', true),
    validator('ds-error')
  ],
  photo: [
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
  lat: DS.attr('number', { defaultValue: 29.956505600000003 }),
  lng: DS.attr('number', { defaultValue: -90.2111232 }),
  photo: DS.attr('string'),
  src: DS.attr('string'),
  msrc: DS.attr('string'),
  w: DS.attr('number'),
  h: DS.attr('number'),
  prevPermalink: DS.attr('string'),
  prevThumbUrl: DS.attr('string'),
  nextPermalink: DS.attr('string'),
  nextThumbUrl: DS.attr('string'),
  make: DS.attr('string'),
  model: DS.attr('string'),
  fNumber: DS.attr('string'),
  exposureTime: DS.attr('string'),
  isoSpeedRatings: DS.attr('string'),
  dateTaken: DS.attr('date'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  hasCoords: computed('lat,lng', function(){
    return this.get('lat') && this.get('lng')
  }),
  camera: computed('make', 'model', function(){
    var string = ''
    if (this.get('make'))
      string = string + `${this.get('make')} `
    if (this.get('model'))
      string = string + this.get('model')
    if (string.length)
      return string.replace(this.make, '')
    else
      return null
  }),
  fInfo: computed('fNumber', 'exposureTime', 'isoSpeedRatings', function(){
    var string = ''
    if (this.get('fNumber'))
      string = string + `f${this.get('fNumber')}, `
    if (this.get('isoSpeedRatings'))
      string = string + `ISO ${this.get('isoSpeedRatings')}, `
    if (this.get('exposureTime'))
      string = string + this.get('exposureTime')
    if (string.length)
      return string
    else
      return null
  }),
  picDate: computed('createdAt', 'dateTaken', function(){
    return this.dateTaken || this.createdAt
  })

});
