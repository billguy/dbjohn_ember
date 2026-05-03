import Service from '@ember/service';
import { setOptions, importLibrary as googleImportLibrary } from '@googlemaps/js-api-loader';
import config from 'dbjohn-ember/config/environment';

export default class GoogleMapsService extends Service {
  _promise = null;

  load() {
    if (!this._promise) {
      setOptions({ key: config.GOOGLE_MAPS_API_KEY, version: 'weekly' });
      this._promise = googleImportLibrary('maps').then(() =>
        googleImportLibrary('marker'),
      );
    }
    return this._promise;
  }
}
