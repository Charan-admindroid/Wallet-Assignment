import { module, test } from 'qunit';
import { setupTest } from 'wallet/tests/helpers';

module('Unit | Route | wallet-money', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:wallet-money');
    assert.ok(route);
  });
});
