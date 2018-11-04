import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | slogans/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:slogans/new');
    assert.ok(route);
  });
});
