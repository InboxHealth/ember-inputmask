import InputMaskComponent from 'ember-inputmask/components/input-mask';

/**
 * `{{email-input}}` component.
 *
 * Displays an input that masks email addresses.
 */

export default class DateInputComponent extends InputMaskComponent {
  mask = 'date';
}
