import { observer } from '@ember/object';
import InputMaskComponent from 'ember-inputmask/components/input-mask';

/**
 * `{{number-input}}` component.
 *
 * Displays an input with numbers, formatted
 *
 * OPTIONS:
 *   decimal - bool or int
 *     Makes the number a decimal with the specified
 *     precision, defaults to 2 if true.
 *   allowMinus - boolean
 *     Sets the allowMinus property (defaults to false)
 *   radix - string
 *     Sets the radix separator (defaults to period)
 *   separator - string
 *     Sets the separator for numbers (defaults to comma)
 *   groupSize - number
 *     Sets the size of number separation (defaults to 3)
 *   group - bool
 *     Sets grouping (1,000 vs 1000) (defaults to false)
 */

export default class NumberInputComponent extends InputMaskComponent {
  mask = 'integer';

  // Default options
  decimal = false;
  group = false;
  allowMinus = false;
  separator = ',';
  radix = '.';
  groupSize = '3';

  updateMask = observer(['mask', 'group', 'decimal', 'separator', 'radix', 'groupSize'], function () {
    this.options = {
      autoGroup: this.group,
      groupSeparator: this.separator,
      allowMinus: this.allowMinus,
      radixPoint: this.radix,
      groupSize: this.groupSize,
    };

    if (this.decimal === true) {
      this.mask = 'decimal';
      this.options.digits = 2;
    } else if (this.decimal) {
      this.mask = 'decimal';
      this.options.digits = this.decimal;
    }

    this._super();
  });
}
