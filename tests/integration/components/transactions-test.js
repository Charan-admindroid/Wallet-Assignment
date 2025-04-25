import { module, test } from 'qunit';
import { setupRenderingTest } from 'wallet/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | transactions', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Transactions />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Transactions>
        template block text
      </Transactions>
    `);

    assert.dom().hasText('template block text');
  });
});
