import { module, test } from 'qunit';
import { setupTest } from 'wallet/tests/helpers';

module('Unit | Route | subs-add', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:subs-add');
    assert.ok(route);
  });
});
