import { module, test } from 'qunit';
import { setupRenderingTest } from 'wallet/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | wallet', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Wallet />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Wallet>
        template block text
      </Wallet>
    `);

    assert.dom().hasText('template block text');
  });
});
