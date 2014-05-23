'use strict';
var PluginError = require('gulp-util/lib/PluginError');

module.exports = function colaError() {
	var Factory = PluginError.bind.apply(PluginError, [].concat(null, 'gulp-cola', Array.prototype.slice.call(arguments)));
	return new Factory();
};
