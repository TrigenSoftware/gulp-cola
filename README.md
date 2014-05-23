# gulp-cola
ColaScript compiler plugin for Gulp.

## Usage

```javascript
var cola = require('gulp-cola');

gulp.task('compile', function() {
  gulp.src('app/*.cola')
    .pipe(cola())
    .pipe(gulp.dest('dist'))
});
```

## Options

- `mangle`

	Pass `false` to skip mangling names.

- `output`

	Pass an object if you wish to specify additional [output
	options](http://lisperator.net/uglifyjs/codegen). The defaults are
	optimized for best compression.

- `compress`

	Pass an object to specify custom [compressor
	options](http://lisperator.net/uglifyjs/compress). Pass `false` to skip
	compression completely.

- `preserveComments`

	A convenience option for `options.output.comments`. Defaults to preserving no
	comments.

	- `all`

		Preserve all comments in code blocks

	- `some`

		Preserve comments that start with a bang (`!`) or include a Closure
		Compiler directive (`@preserve`, `@license`, `@cc_on`)

	- `function`

		Specify your own comment preservation function. You will be passed the
		current node and the current comment and are expected to return either
		`true` or `false`.

You can also pass the `uglify` function any of the options [listed
here](https://github.com/mishoo/UglifyJS2#the-simple-way) to modify
UglifyJS's behavior.
