import InputMaskComponent from 'ember-inputmask/components/input-mask';

/**
 * `{{currency-input}}` component.
 *
 * Displays an input that masks to currency
 */

export default class CurrencyInputComponent extends InputMaskComponent {
  mask = 'currency';
}
