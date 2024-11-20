import { observer } from '@ember/object';
import InputMaskComponent from 'ember-inputmask/components/input-mask';

/**
 * `{{zip-code-input}}` component.
 *
 * Displays an input that masks a US ZIP code.
 *
 * Future: Add config options that allow users to set locality
 * app wide.
 *
 * OPTIONS:
 *   fullCode - bool
 *     Allows users to optionally enter the full ZIP+4 area code.
 */

export default class ZipCodeInputComponent extends InputMaskComponent {
  mask = '99999';

  fullCode = false;

  updateMask = observer(['mask', 'fullCode'], function () {
    if (this.fullCode) {
      this.mask = '99999[-9999]';
    } else {
      this.mask = '99999';
    }

    this._super();
  });
}
