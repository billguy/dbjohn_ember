import Model, { attr } from '@ember-data/model';
// import { validator, buildValidations } from 'ember-cp-validations';
import config from '../config/environment';

// const Validations = buildValidations({
//   title: [
//     validator('presence', true),
//     validator('ds-error')
//   ],
//   caption: [
//     validator('presence', true),
//     validator('ds-error')
//   ],
//   photo: [
//     validator('presence', true),
//     validator('ds-error')
//   ]
// });
// export default class PicModel extends Model.extend(Validations) {

export default class PicModel extends Model {
  @attr('boolean', { defaultValue: false }) published;
  @attr('string') title;
  @attr('string') permalink;
  @attr('string') caption;
  @attr() tags; // To the server
  @attr() tagList; //From the server
  @attr('string') location;
  @attr('number', { defaultValue: 29.956505600000003 }) lat;
  @attr('number', { defaultValue: -90.2111232 }) lng;
  @attr('string') photo;
  @attr('string') src;
  @attr('string') msrc;
  @attr('number') w;
  @attr('number') h;
  @attr('string') prevPermalink;
  @attr('string') prevThumbUrl;
  @attr('string') nextPermalink;
  @attr('string') nextThumbUrl;
  @attr('string') make;
  @attr('string') model;
  @attr('string') fNumber;
  @attr('string') exposureTime;
  @attr('string') isoSpeedRatings;
  @attr('date') dateTaken;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  get hasCoords() {
    return this.lat && this.lng;
  }
  get camera() {
    var string = '';
    if (this.make) string = string + `${this.make} `;
    if (this.model) string = string + this.model;
    if (string.length) return string.replace(this.make, '');
    else return null;
  }
  get fInfo() {
    var string = '';
    if (this.fNumber) string = string + `f${this.fNumber}, `;
    if (this.isoSpeedRatings) string = string + `ISO ${this.isoSpeedRatings}, `;
    if (this.exposureTime) string = string + this.exposureTime;
    if (string.length) return string;
    else return null;
  }
  get picDate() {
    return this.dateTaken || this.createdAt;
  }
  get discusIdentifier() {
    return `${config.siteURL}/pics/${this.permalink}`;
  }
}
