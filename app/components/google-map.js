import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import config from 'dbjohn-ember/config/environment';

export default class GoogleMapComponent extends Component {
  @service googleMaps;

  @action
  async setupMap(element) {
    await this.googleMaps.load();

    const position = { lat: this.args.lat, lng: this.args.lng };
    const map = new google.maps.Map(element, {
      center: position,
      zoom: this.args.zoom ?? 10,
      mapId: config.GOOGLE_MAP_ID,
    });

    const marker = new google.maps.marker.AdvancedMarkerElement({ position, map });

    if (this.args.onMarkerClick) {
      marker.addListener('gmp-click', this.args.onMarkerClick);
    }
  }
}
