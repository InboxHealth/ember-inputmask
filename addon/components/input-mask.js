import { on } from '@ember/object/evented';
import { observer } from '@ember/object';
import TextField from '@ember/component/text-field';
import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';
import { bind } from '@ember/runloop';

/**
 * `{{input-mask}}` component.
 *
 * Displays an input with the specified mask applied to it
 * using the jquery.inputmask plugin.
 *
 * OPTIONS:
 *   showMaskOnHover - bool=true
 *     Shows a preview of the mask when the field is hovered.
 *   showMaskOnFocus - bool=true
 *     Shows a preview of the mask when the field is focussed.
 *   rightAlign - bool=false
 *     Aligns the number to the right
 *   clearIncomplete - bool=false
 *     Clear the input if it was incomplete (partial date, time, etc.)
 *   greedyMask - bool=false
 *     Shows optional parts of a mask in preview when true
 */

export default class InputMaskComponent extends TextField {
  @tracked mask = '';

  showMaskOnFocus = true;
  showMaskOnHover = true;
  rightAlign = false;
  clearIncomplete = false;
  greedyMask = false;

  // Strangely enough, if we initialize the options object on the component itself it's shared between all instances of the object. Since we don't want that, and we do want to store options somewhere, we need to initialize an options object whenever we create an `input-mask`.
  initializeOptions = on('init', function () {
    this.options = {};
  });

  // Initialize the mask by forcing a call to the updateMask function
  didInsertElement() {
    super.didInsertElement(...arguments);
  }

  // Remove the mask from the input
  teardownMask = on('willDestroyElement', function () {
    let inputElement = this.element.querySelector('input');

    if (inputElement && inputElement.inputmask) {
      inputElement.inputmask.remove();
    }
  });

  setMask() {
    var mask = this.mask;
    var options = this.options;

    let inputElement = this.element.querySelector('input');

    if (inputElement && inputElement.inputmask) {
      inputElement.inputmask.remove();
      inputElement.inputmask(mask, options).mask(inputElement);
    }

    // Initialize the unmasked value if it exists
    if (!isEmpty(this.unmaskedValue)) {
      inputElement.value = this.unmaskedValue;
    }

    // If the mask has changed, we need to refocus the input to show the proper mask preview. Since the caret is not positioned by the focus even, but the click event, we need to trigger a click as well.
    if (document.activeElement === inputElement) {
      inputElement.blur();
      inputElement.focus();
      inputElement.click();
    }
  }

  // Update the mask whenever the mask itself changes or one of the options changes. This observer is meant to be extensible so that other fields can add options (See `decimal-input`), which is why the actual setting of the mask is handled in another function.
  updateMask = observer(
    'mask',
    'showMaskOnFocus',
    'showMaskOnHover',
    'rightAlign',
    'clearIncomplete',
    'greedyMask',
    'pattern',
    'regex',
    function () {
      var self = this;

      if (this.mask.toLowerCase() === 'regex') {
        // Regex has to capitalized for the plugin, but that's annoying so let's just allow users to enter it however they want...
        this.mask = 'Regex';

        // Note: I like pattern better, but I'll leave regex in as an option as well since that's what the plugin defines on the options hash
        this.options.regex = this.pattern || this.regex;
      }

      this.options = {
        ...this.options,
        showMaskOnFocus: this.showMaskOnFocus,
        showMaskOnHover: this.showMaskOnHover,
        rightAlign: this.rightAlign,
        clearIncomplete: this.clearIncomplete,
        greedy: this.greedyMask,
        oncleared: function () {
          self.set('value', null);
        },
      };

      this.setMask();
    }
  );

  // Unmask the value of the field and set the property.
  setUnmaskedValue = observer('value', function () {
    setTimeout(
      bind(this, function () {
        let inputElement = this.element.querySelector('input');

        if (!isEmpty(inputElement)) {
          this.unmaskedValue = inputElement.inputmask.unmaskedvalue();
        }
      }),
      1
    );
  });

  // When the unmaskedValue changes, set the value.
  setValue = observer('unmaskedValue', function () {
    setTimeout(
      bind(this, function () {
        let inputElement = this.element.querySelector('input');

        if (!isEmpty(inputElement)) {
          if (inputElement.inputmask.unmaskedvalue() !== this.unmaskedValue) {
            inputElement.value = this.unmaskedValue;
            // this.$().val(this.unmaskedValue);
          }
        }
      }),
      1
    );
  });
}
