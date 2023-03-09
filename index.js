/* eslint-env node */
'use strict';

const fastbootTransform = require('fastboot-transform');

const filesToImport = [
  'inputmask.min.js'
];

module.exports = {
  name: 'ember-inputmask',
  options: {
    nodeAssets: {
      inputmask: () => ({
        vendor: {
          include: filesToImport.map(file => `dist/${file}`),
          processTree: input => fastbootTransform(input)
        }
      })
    }
  },
  included() {
    this._super.included.apply(this, arguments);
    filesToImport.forEach(file => {
      this.import(`vendor/inputmask/dist/${file}`);
    });
    this.import('vendor/shims/inputmask.js');
  }
};
