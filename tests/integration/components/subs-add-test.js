import { module, test } from 'qunit';
import { setupRenderingTest } from 'wallet/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | subs-add', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<SubsAdd />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <SubsAdd>
        template block text
      </SubsAdd>
    `);

    assert.dom().hasText('template block text');
  });
});
