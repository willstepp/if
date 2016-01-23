var gulp = require('gulp'); 
var jshint = require('gulp-jshint');

//js lint
gulp.task('lint', function () {
  var pack  = require('./package.json');
  return gulp.src('app/**/*.js')
    .pipe(jshint(pack.jshintConfig))
    .pipe(jshint.reporter('default'));
});

//run sandbox site
gulp.task('sandbox', function () {
  var express = require('express');

  var app = express();
  app.use(express.static(__dirname + '/app'));
  app.use(express.static(__dirname + '/'));

  app.get('/', function (req, res) {
    res.render('index.html');
  });

  var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    console.log('if listening at http://localhost:%s', port);
  });
});

//run tasks whenever a lib file changes
gulp.task('watch', function () {
  gulp.watch(['app/**/*.js', 'app/**/*.html'], ['lint']);
});

//default task, used in development
gulp.task('default', ['lint', 'sandbox', 'watch']);
