import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | contact/email', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:contact/email');
    assert.ok(route);
  });
});
