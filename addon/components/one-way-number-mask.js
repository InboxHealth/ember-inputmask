import OneWayInputMask, { DEFAULT_NON_BOUND_PROPS } from 'ember-inputmask/components/one-way-input-mask';
import { computed, get, set } from '@ember/object';
import { isBlank } from '@ember/utils';

const DEFAULT_OPTIONS = {
  groupSeparator: ',',
  radixPoint: '.',
  groupSize: '3',
  autoGroup: false,
  allowMinus: false
};

export default OneWayInputMask.extend({
  NON_ATTRIBUTE_BOUND_PROPS: DEFAULT_NON_BOUND_PROPS.concat('decimal'),

  /**
   * Set this to true to include decimals
   */
  decimal: false,

  /**
   * @override
   */
  mask: computed('decimal', function() {
    if (get(this, 'decimal')) {
      return 'decimal';
    }

    return 'integer';
  }),

  init() {
    this._super(...arguments);

    set(this, '_options', Object.assign({}, DEFAULT_OPTIONS, get(this, '_options')));

    if (get(this, 'decimal')) {

      // Give default digits if we don't have them aleady
      if (isBlank(get(this, 'options.digits'))) {
        set(this, '_options.digits', 2);
      }
    }
  },
});
