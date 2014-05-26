'use strict';
var path = require('path'),
    through = require('through2'),
	cola = require('cola-script'),
	merge = require('deepmerge'),
	colaError = require('./lib/error.js');

module.exports = function(opt) {

	function translate(file, encoding, callback) {
		/*jshint validthis:true */

		if (file.isNull()) {
			this.push(file);
			return callback();
		}

		if (file.isStream()) {
			return callback(colaError('Streaming not supported', {
				fileName: file.path,
				showStack: false
			}));
		}

		var options = merge(opt || {}, {
			fromString: true,
			path: path.dirname(file.path),
			output: {}
		});

		var translated,
			originalSourceMap;

		if (file.sourceMap) {
			options.outSourceMap = file.relative;
			options.inSourceMap = file.sourceMap;
			originalSourceMap = file.sourceMap;
		}

		if (options.preserveComments === 'all') {
			options.output.comments = true;
		} else if (options.preserveComments === 'some') {
			// preserve comments with directives or that start with a bang (!)
			options.output.comments = /^!|@preserve|@license|@cc_on/i;
		} else if (typeof options.preserveComments === 'function') {
			options.output.comments = options.preserveComments;
		}

		try {
			translated = cola.translate(String(file.contents), options);
			file.contents = new Buffer(translated.code);
		} catch (e) {
			return callback(colaError(e.message, {
				fileName: file.path,
				lineNumber: e.line,
				stack: e.stack,
				showStack: false
			}));
		}

		if (file.sourceMap) {
			file.sourceMap = JSON.parse(translated.map);
			file.sourceMap.sourcesContent = originalSourceMap.sourcesContent;
			file.sourceMap.sources = originalSourceMap.sources;
		}

		this.push(file);

		callback();
	}

	return through.obj(translate);
};
