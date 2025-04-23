import { module, test } from 'qunit';
import { setupTest } from 'wallet/tests/helpers';

module('Unit | Route | subscriptions/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:subscriptions/index');
    assert.ok(route);
  });
});
