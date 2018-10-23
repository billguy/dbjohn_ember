import DS from 'ember-data';
import TokenAuthorizerMixin from 'ember-simple-auth-token/mixins/token-authorizer';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend(TokenAuthorizerMixin, {
  host: config.host
});
