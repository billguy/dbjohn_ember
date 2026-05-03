import Component from '@glimmer/component';
import { action } from '@ember/object';
import config from 'dbjohn-ember/config/environment';
import { didInsert } from '@ember/render-modifiers';

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

  <template>
    <div {{didInsert this.setup}}></div>
  </template>
}
