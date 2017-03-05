const gulp = require('gulp')
const plugins = require('gulp-load-plugins')();

const SPECS = process.env.SPECS || null;

gulp.task('setup-coverage', () => {
  return gulp.src(['./lib/**/*.js'])
    .pipe(plugins['istanbul']())
    .pipe(plugins['istanbul'].hookRequire())
})

gulp.task('test', ['setup-coverage'], () => {
  return gulp.src('./test/**/*.spec.js', {
      read: false
    })
    .pipe(plugins['mocha']({
      reporter: 'spec'
    }))
    .pipe(plugins['istanbul'].writeReports({
    	dir: './test/results/coverage'
    }))
    .pipe(plugins['istanbul'].enforceThresholds({ thresholds: { global: 90 } }))
});

