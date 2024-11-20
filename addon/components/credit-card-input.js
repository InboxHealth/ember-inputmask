import InputMaskComponent from 'ember-inputmask/components/input-mask';
import { observer } from '@ember/object';

/**
 * `{{credit-card-input}}` component.
 *
 * Displays an input with that masks to credit card numbers
 *
 * Currently Supports: Visa, MasterCard, Amex, Diners Club, Discover, JCB
 *
 * FUTURE:
 *   - Add support for more cards
 *   - Add validation for full card numbers
 */

export default class CreditCardInputComponent extends InputMaskComponent {
  updateMask = observer(['mask', 'cardType', 'separator'], function () {
    const cardType = this.cardType;
    // s for separator for convenience
    const s = this.separator || '-';
    // Also, we put the default in here instead of defining it on the model
    let mask;

    if (cardType === 'American Express') {
      mask = '9999' + s + '9999999' + s + '9999';
    } else if (cardType === 'Diners Club') {
      mask = '9999' + s + '999999' + s + '9999';
    } else {
      mask = '9999' + s + '9999' + s + '9999' + s + '9999';
    }

    if (this.mask !== mask) {
      this.mask = mask;
    }

    this._super();
  });

  updateCardType = observer('unmaskedValue', function () {
    const unmaskedValue = this.unmaskedValue || '';
    let cardType;

    if (unmaskedValue.match(/^4/)) {
      cardType = 'Visa';
    } else if (unmaskedValue.match(/^5[1-5]/)) {
      cardType = 'MasterCard';
    } else if (unmaskedValue.match(/^3[47]/)) {
      cardType = 'American Express';
    } else if (unmaskedValue.match(/^3(?:0[0-5]|[68])/)) {
      cardType = 'Diners Club';
    } else if (unmaskedValue.match(/^6(?:011|5)/)) {
      cardType = 'Discover';
    } else if (unmaskedValue.match(/^(?:2131|1800|35)/)) {
      cardType = 'JCB';
    } else {
      cardType = 'Other';
    }

    this.cardType = cardType;
  });
}
