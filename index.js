'use strict';

module.exports = {
  name: require('./package').name,
  included(app) {
    this._super.included(app);

    this.import('node_modules/jquery.inputmask/dist/jquery.inputmask.bundle.js');
  },
};
