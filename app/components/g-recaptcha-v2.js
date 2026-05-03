import Component from '@glimmer/component';
import { action } from '@ember/object';
import config from 'dbjohn-ember/config/environment';

export default class GRecaptchaV2Component extends Component {
  @action
  setup(element) {
    grecaptcha.ready(() => {
      grecaptcha.render(element, {
        sitekey: config.CAPTCHA_KEY,
        callback: this.args.verified,
      });
    });
  }
}
