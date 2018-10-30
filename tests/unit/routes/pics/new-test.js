import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | pics/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:pics/new');
    assert.ok(route);
  });
});
